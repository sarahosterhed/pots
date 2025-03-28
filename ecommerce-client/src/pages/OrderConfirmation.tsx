import { useEffect, useState } from "react"
import { getFromLocalStorage } from "../utils/localStorageUtils"
import { useOrders } from "../hooks/useOrders";
import { OrderDetails } from "../types/Order";
import { BeatLoader } from "react-spinners";
import "../styles/pages/OrderConfirmation.css"

export const OrderConfirmation = () => {
    const paymentId = getFromLocalStorage("orderId");

    const { fetchOrderByIdHandler, isLoading } = useOrders();
    const [order, setOrder] = useState<OrderDetails>();
    useEffect(() => {
        const getOrderDetails = async () => {
            const data = await fetchOrderByIdHandler(paymentId);
            setOrder(data);
        }
        if (order) return;
        getOrderDetails();
    })

    return (
        <>
            <h2>Thank you for your order</h2>
            {isLoading &&
                <BeatLoader />
            }
            <p>Order number: {order?.id}</p>
            <p>Customer name: {order?.customer_firstname} {order?.customer_lastname}</p>
            <div>
                <h4>Order Details</h4>
                {order?.order_items.map((item) => (
                    <div key={item.id} className="confirmation-order-items">
                        <p>{item.product_name}</p>
                        <p>x {item.quantity}</p>
                        <p>{item.unit_price} kr</p>
                    </div>
                ))}
                <h4 className="total-price">{order?.total_price} kr</h4>
            </div>

        </>
    )
}
