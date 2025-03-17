import { useEffect, useState } from "react";
import { OrderDetails } from "../types/Order";
import { useParams } from "react-router";
import { useOrders } from "../hooks/useOrders";


export const OrderDetailsPage = () => {
    const [orderDetails, setOrderDetails] = useState<OrderDetails>({
        id: 0,
        customer_id: 0,
        total_price: 0,
        payment_status: "",
        payment_id: "",
        order_status: "",
        created_at: "",
        customer_firstname: "",
        customer_lastname: "",
        customer_email: "",
        customer_phone: "",
        customer_street_address: "",
        customer_postal_code: "",
        customer_city: "",
        customer_country: "",
        order_items: []
    });
    const { id } = useParams()
    const { fetchOrderByIdHandler, updateOrderItemHandler } = useOrders();
    const [updateItemId, setUpdateItemId] = useState<number | null>(null);

    useEffect(() => {
        const getOrder = async () => {
            const response = await fetchOrderByIdHandler(Number(id));
            setOrderDetails(response)
            console.log(response)
        }
        // if (orderDetails) return;
        getOrder();
    }, [id])

    const {
        customer_id,
        total_price,
        payment_status,
        payment_id,
        order_status,
        created_at,
        customer_firstname,
        customer_lastname,
        customer_email,
        customer_phone,
        customer_street_address,
        customer_postal_code,
        customer_city,
        customer_country,
        order_items } = orderDetails;


    return (
        <section className="order-details-wrapper">
            <div className="order-main">
                <p><b>Order number:</b> {id}</p>
                <p><b>Status:</b> {order_status}</p>
                <p><b>Created at:</b> {created_at}</p>
            </div>
            <div className="flex-columns">
                <section className="order-payment-wrapper">
                    <h3>Payment</h3>
                    <p><span>Payment id:</span> <span>{payment_id}</span></p>
                    <p><span>Status:</span> <span>{payment_status}</span></p>
                    <p><span>Total:</span> <span>{total_price} kr</span></p>
                </section>
                <section className="order-customer-wrapper">
                    <h3>Customer Details</h3>
                    <p>Customer ID: {customer_id}</p>
                    <p>Name: {customer_firstname} {customer_lastname}</p>
                    <p>Email: {customer_email}</p>
                    <p>Phone: {customer_phone}</p>
                    <p>Adress: {customer_street_address}</p>
                    <p>{customer_postal_code} {customer_city}</p>
                    <p>{customer_country}</p>
                </section>
            </div>
            <ul className="order-items">
                {order_items.map((item) => (
                    <li key={item.id}>
                        <p>{item.product_name}</p>
                        <p>{item.quantity}</p>
                        {updateItemId !== item.id ? (
                            <button onClick={() => { setUpdateItemId(Number(id)) }}>Edit quantity</button>

                        ) : (
                            <div>
                                <div className="flex-columns">
                                    <button>-</button>
                                    <p>{item.quantity}</p>
                                    <button>+</button>
                                </div>
                                <button>Save</button>
                            </div>
                        )
                        }
                    </li>
                ))}
            </ul>
        </section>
    )
}