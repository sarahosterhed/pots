import { useEffect, useState } from "react";
import { OrderDetails } from "../types/Order";
import { useParams } from "react-router";
import { useOrders } from "../hooks/useOrders";


export const OrderDetailsPage = () => {
    const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
    const { id } = useParams()
    const { fetchOrderByIdHandler } = useOrders();
    console.log("id", id)
    console.log("order-orderItems", orderDetails)

    useEffect(() => {
        const getOrder = async () => {
            const response = await fetchOrderByIdHandler(Number(id));
            setOrderDetails(response)
            console.log("orderdetails-response", response)
        }
        getOrder();
    }, [])

    return (
        <>
            <div>Order-items</div>
        </>
    )
}