import { useState } from "react";
import { Order, OrderDetails } from "../../types/Order";

type ShowOrderItemsProps = {
    order: Order;
}


export const OrderItems = ({ order }: ShowOrderItemsProps) => {
    const [orderDetails, setOrderDetails] = useState<OrderDetails>();

    console.log("order-orderItems", orderDetails)

    return (
        <>
            {JSON.stringify(orderDetails)}
            <div>Order-items</div>
        </>
    )
}
