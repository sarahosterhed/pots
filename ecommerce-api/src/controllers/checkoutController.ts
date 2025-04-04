import { Request, Response } from "express";
import { ResultSetHeader } from "mysql2";
import { db } from "../config/db";
import { IOrderItem } from "../models/IOrderItem";
import { ICheckoutLineItem } from "../models/ICheckout";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export const createCheckoutSession = async (req: Request, res: Response) => {
    const lineItems: ICheckoutLineItem = req.body.line_items;
    const clientReferenceId = req.body.customer_id;

    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        ui_mode: 'embedded',
        client_reference_id: clientReferenceId,
        return_url: 'https://knodd.vercel.app/order-confirmation?session_id={CHECKOUT_SESSION_ID}'
    });

    res.send({ clientSecret: session.client_secret });
};


export const updateOrderAndStock = async (req: Request, res: Response) => {
    const event = req.body;
    switch (event.type) {
        case "checkout.session.completed":
            const session = event.data.object;

            try {
                await db.query("START TRANSACTION");

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

                await db.query<ResultSetHeader>(updateOrderSql, orderParams);

                const getOrderItemsSql = `
                    SELECT product_id, quantity
                    FROM order_items
                    WHERE order_id = ?
                `

                const [orderItems] = await db.query<IOrderItem[]>(getOrderItemsSql, session.client_reference_id);

                for (const item of orderItems) {
                    const productStockSql = `
                        SELECT stock
                        FROM products
                        WHERE id = ?
                    `

                    const [stockResult] = await db.query(productStockSql, [item.product_id]
                    );
                    console.log("stock result", stockResult)

                    if (stockResult[0].stock < item.quantity) {
                        console.log(`Not enough products in stock, ${item.quantity} of ${item.product_id} remains`);
                        throw new Error(`Not enough products in stock, ${item.quantity} of ${item.product_id} remains`);
                    }

                    const updateProductStockSql = `
                        UPDATE products
                        SET stock = stock - ?
                        WHERE id = ? AND stock >= ?
                    `
                    const updateProductStockParams = [item.quantity, item.product_id, item.quantity]
                    await db.query<ResultSetHeader>(updateProductStockSql, updateProductStockParams);
                }

                await db.query("COMMIT");
                res.json({ message: "Stock sucessfully updated" })
                break;

            } catch (error) {
                await db.query("ROLLBACK");
                console.log("Error updating order and stock", error)
            }

        default:
            console.log(`Unhandled event type ${event.type}`);
            res.status(400).json({ error: "Unhandled event type" });
    }
};