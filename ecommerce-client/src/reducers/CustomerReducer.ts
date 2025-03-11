import { Customer } from "../types/Customer";

export type Action = {
    type: ActionType,
    payload: string;
}

export enum ActionType {
    LOADED,
    CREATED,
    UPDATED,
    DELETED,
}

export const CustomerReducer = (customers: Customer[], action: Action): Customer[] => {
    if (action.type === ActionType.LOADED) {
        return JSON.parse(action.payload).reverse();
    }
    if (action.type === ActionType.DELETED) {
        return customers.filter((customer) => customer.id !== JSON.parse(action.payload))
    }

    return customers;
}