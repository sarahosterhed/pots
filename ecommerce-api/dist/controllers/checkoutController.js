"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderAndStock = exports.createCheckoutSession = void 0;
const db_1 = require("../config/db");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const createCheckoutSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const lineItems = req.body.line_items;
    const clientReferenceId = req.body.customer_id;
    const session = yield stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        ui_mode: 'embedded',
        client_reference_id: clientReferenceId,
        return_url: 'https://knodd.vercel.app/order-confirmation?session_id={CHECKOUT_SESSION_ID}'
    });
    res.send({ clientSecret: session.client_secret });
});
exports.createCheckoutSession = createCheckoutSession;
const updateOrderAndStock = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const event = req.body;
    switch (event.type) {
        case "checkout.session.completed":
            const session = event.data.object;
            try {
                yield db_1.db.query("START TRANSACTION");
                const updateOrderSql = `
                    UPDATE orders
                    SET payment_status = ?, payment_id = ?, order_status = "Recieved"
                    WHERE id = ?
                `;
                const orderParams = [
                    "Paid",
                    session.id,
                    session.client_reference_id,
                ];
                yield db_1.db.query(updateOrderSql, orderParams);
                const getOrderItemsSql = `
                    SELECT product_id, quantity
                    FROM order_items
                    WHERE order_id = ?
                `;
                const [orderItems] = yield db_1.db.query(getOrderItemsSql, session.client_reference_id);
                for (const item of orderItems) {
                    const productStockSql = `
                        SELECT stock
                        FROM products
                        WHERE id = ?
                    `;
                    const [stockResult] = yield db_1.db.query(productStockSql, [item.product_id]);
                    console.log("stock result", stockResult);
                    if (stockResult[0].stock < item.quantity) {
                        console.log(`Not enough products in stock, ${item.quantity} of ${item.product_id} remains`);
                        throw new Error(`Not enough products in stock, ${item.quantity} of ${item.product_id} remains`);
                    }
                    const updateProductStockSql = `
                        UPDATE products
                        SET stock = stock - ?
                        WHERE id = ? AND stock >= ?
                    `;
                    const updateProductStockParams = [item.quantity, item.product_id, item.quantity];
                    yield db_1.db.query(updateProductStockSql, updateProductStockParams);
                }
                yield db_1.db.query("COMMIT");
                res.json({ message: "Stock sucessfully updated" });
                break;
            }
            catch (error) {
                yield db_1.db.query("ROLLBACK");
                console.log("Error updating order and stock", error);
            }
        default:
            console.log(`Unhandled event type ${event.type}`);
            res.status(400).json({ error: "Unhandled event type" });
    }
});
exports.updateOrderAndStock = updateOrderAndStock;
