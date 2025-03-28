import { useContext } from "react";
import { CheckoutCurrency, CheckoutLineItem, CheckoutPayload, OrderedProduct } from "../types/Checkout";
import { OrderCreate } from "../types/Order";
import CartContext from "../contexts/CartContext";
import { cartActionType } from "../reducers/CartReducer";

export const useCheckout = () => {
    const { cartDispatch } = useContext(CartContext)

    const prepareCheckoutPayloadHandler = (orderId: number, order: OrderCreate): CheckoutPayload => {
        const lineItems: CheckoutLineItem[] = order.order_items.map(({ product_name, quantity, unit_price }) => ({
            price_data: {
                currency: CheckoutCurrency.SEK,
                product_data: {
                    name: product_name
                },
                unit_amount: unit_price * 100,
            },
            quantity: quantity
        }));

        const orderedProducts: OrderedProduct[] = order.order_items.map(({ product_id, quantity }) => ({
            product_id: product_id,
            quantity: quantity
        }));

        const checkoutPayload: CheckoutPayload = {
            lineItems: lineItems,
            orderId: orderId,
            orderedProducts: orderedProducts
        }

        return checkoutPayload;
    }

    const checkoutCleanupHandler = () => {
        cartDispatch({
            type: cartActionType.RESET_CART,
            payload: null
        })
        localStorage.removeItem('cachedCart');
        localStorage.removeItem('customerInput');
    }

    return {
        prepareCheckoutPayloadHandler,
        checkoutCleanupHandler
    };
}