import { Order } from './../types/Order';

export type OrderAction = {
    type: OrderActionType,
    payload: string;
}

export enum OrderActionType {
    ORDERS_LOADED,
    ORDER_UPDATED,
    ORDER_DELETED,
}

export const OrderReducer = (orders: Order[], action: OrderAction): Order[] => {
    if (action.type === OrderActionType.ORDERS_LOADED) {
        return JSON.parse(action.payload).reverse();
    }
    if (action.type === OrderActionType.ORDER_UPDATED) {
        const updatedOrder = JSON.parse(action.payload)
        return orders.map((Order) => Order.id === updatedOrder.id ? updatedOrder : Order)
    }
    if (action.type === OrderActionType.ORDER_DELETED) {
        return orders.filter((Order) => Order.id !== JSON.parse(action.payload))
    }


    return orders;
}