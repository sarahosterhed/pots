import { Order } from './../types/Order';

export type Action = {
    type: ActionType,
    payload: string;
}

export enum ActionType {
    ORDERS_LOADED,
    ORDER_UPDATED,
    ORDER_DELETED,
}

export const OrderReducer = (orders: Order[], action: Action): Order[] => {
    if (action.type === ActionType.ORDERS_LOADED) {
        return JSON.parse(action.payload).reverse();
    }
    if (action.type === ActionType.ORDER_UPDATED) {
        const updatedOrder = JSON.parse(action.payload)
        return orders.map((Order) => Order.id === updatedOrder.id ? updatedOrder : Order)
    }
    if (action.type === ActionType.ORDER_DELETED) {
        return orders.filter((Order) => Order.id !== JSON.parse(action.payload))
    }


    return orders;
}