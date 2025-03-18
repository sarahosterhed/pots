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
    const { fetchOrderByIdHandler, updateOrderItemHandler, deleteOrderItemHandler } = useOrders();
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


    const handleIncrease = async (itemId: number) => {
        setOrderDetails({
            ...orderDetails,
            order_items: orderDetails.order_items.map((item) => (
                item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
            ))
        })
    }

    const handleDecrease = async (itemId: number) => {
        setOrderDetails({
            ...orderDetails,
            order_items: orderDetails.order_items.map((item) => (
                item.id === itemId && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            ))
        })
    }

    const handleSave = async (itemId: number, quantity: number) => {
        const payload = { quantity: quantity };
        await updateOrderItemHandler(itemId, payload);
        setUpdateItemId(Number(null));
    }

    const handleDelete = async (itemId: number) => {
        await deleteOrderItemHandler(itemId);
        setUpdateItemId(Number(null));
    }


    return (
        <section className="order-details-wrapper">
            <div className="order-main">
                <p><b>Order number:</b> {id}</p>
                <p><b>Status:</b> {order_status}</p>
                <p><b>Created at:</b> {created_at}</p>
            </div>
            <div className="flex">
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
                            <button onClick={() => { setUpdateItemId(Number(item.id)) }}>Edit</button>

                        ) : (
                            <div>
                                <div className="flex">
                                    <button onClick={() => handleDecrease(item.id)}>-</button>
                                    <p>{item.quantity}</p>
                                    <button onClick={() => { handleIncrease(item.id) }}>+</button>
                                </div>
                                <div className="flex">
                                    <button onClick={() => { handleDelete(item.id) }} >Delete</button>
                                    <button onClick={() => { handleSave(item.id, item.quantity) }} >Save</button>
                                </div>
                            </div>
                        )
                        }
                    </li>
                ))}
            </ul>
        </section>
    )
}