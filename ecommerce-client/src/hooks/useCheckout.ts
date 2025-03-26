import { useContext, useState } from "react";
import { createCheckoutSession } from "../services/checkoutService";
import { CheckoutCurrency, CheckoutLineItem, CheckoutPayload } from "../types/Checkout";
import { OrderCreate } from "../types/Order";
import CartContext from "../contexts/CartContext";
import { cartActionType } from "../reducers/CartReducer";

export const useCheckout = () => {
    const [error, setError] = useState<string>("");
    const [loading, setIsLoading] = useState<boolean>(false);
    const { cartDispatch } = useContext(CartContext)

    const createCheckoutHandler = async (payload: CheckoutPayload) => {
        setIsLoading(true);
        try {
            const data = await createCheckoutSession(payload);
            console.log("usehook", data)
            return data;
        } catch (error) {
            setError("Error: Could not proceed to checkout");
            throw error;
        } finally {
            setIsLoading(false);
        }

    };

    const prepareCheckoutPayloadHandler = ({ customer_id, order_items }: OrderCreate): CheckoutPayload => {
        const lineItems: CheckoutLineItem[] = order_items.map(({ product_name, quantity, unit_price }) => ({
            price_data: {
                currency: CheckoutCurrency.SEK,
                product_data: {
                    name: product_name
                },
                unit_amount: unit_price * 100,
            },
            quantity: quantity
        }));

        const checkoutPayload: CheckoutPayload = {
            lineItems: lineItems,
            clientReferenceId: customer_id
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
        error,
        loading,
        createCheckoutHandler,
        prepareCheckoutPayloadHandler,
        checkoutCleanupHandler
    };
}