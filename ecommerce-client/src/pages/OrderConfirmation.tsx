import { useEffect, useState } from "react"
import { getFromLocalStorage } from "../utils/localStorageUtils"
import { useOrders } from "../hooks/useOrders";
import { OrderDetails } from "../types/Order";
import { BeatLoader } from "react-spinners";
import "../styles/pages/OrderConfirmation.css"
import { useNavigate } from "react-router";

export const OrderConfirmation = () => {
    const paymentId = getFromLocalStorage("orderId");
    const { fetchOrderByIdHandler, isLoading } = useOrders();
    const [order, setOrder] = useState<OrderDetails>();
    const navigate = useNavigate();
    useEffect(() => {
        const getOrderDetails = async () => {
            const data = await fetchOrderByIdHandler(paymentId);
            setOrder(data);
        }
        if (order) return;
        getOrderDetails();
    })

    return (
        <section className="order-confirmation-page">
            <h2>Thank you for your order!</h2>
            {isLoading &&
                <BeatLoader />
            }
            <p><span>Order number:</span> <span>{order?.id}</span></p>
            <p><span>Customer name:</span> <span>{order?.customer_firstname} {order?.customer_lastname}</span></p>
            <div>
                <h3>Order Details</h3>
                {order?.order_items.map((item) => (
                    <div key={item.id} className="confirmation-order-items">
                        <p className="order-item-heading">Order Item</p>
                        <p><span>Product:</span><span>{item.product_name}</span></p>
                        <p><span>Amount:</span><span>x {item.quantity}</span></p>
                        <p><span>Price:</span><span>{item.unit_price} kr</span></p>
                    </div>
                ))}
                <h3 className="total-price"><span>Total price:</span><span>{order?.total_price} kr</span></h3>
            </div>
            <button onClick={() => navigate("/")}>Back to Start</button>
        </section>
    )
}
