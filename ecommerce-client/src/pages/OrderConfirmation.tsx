import { useEffect, useState } from "react"
import { getFromLocalStorage } from "../utils/localStorageUtils"
import { useOrders } from "../hooks/useOrders";
import { OrderDetails } from "../types/Order";

export const OrderConfirmation = () => {
    const paymentId = getFromLocalStorage("paymentId");
    const { fetchOrderByPaymentIdHandler } = useOrders();
    const [order, setOrder] = useState<OrderDetails>();
    useEffect(() => {

        const getOrderDetails = async () => {
            const data = await fetchOrderByPaymentIdHandler(paymentId);
            console.log(data)
            setOrder(data);
        }
        if (order) return;
        getOrderDetails();
    })

    return (
        <>
            <h2>Thank you for your order</h2>
            <p>Order number:{order?.id}</p>
            <p>{order?.customer_firstname} {order?.customer_lastname}</p>
            {order?.order_items.map((item) => (
                <li key={item.id}>{item.product_name}</li>
            ))}

        </>
    )
}
