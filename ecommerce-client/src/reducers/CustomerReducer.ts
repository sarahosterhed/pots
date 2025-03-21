import { Customer } from "../types/Customer";

export type CustomerAction = {
    type: CustomerActionType,
    payload: string;
}

export enum CustomerActionType {
    LOADED,
    UPDATED,
    DELETED,
}

export const CustomerReducer = (customers: Customer[], action: CustomerAction): Customer[] => {
    if (action.type === CustomerActionType.LOADED) {
        return JSON.parse(action.payload).reverse();
    }
    if (action.type === CustomerActionType.UPDATED) {
        const updatedCustomer = JSON.parse(action.payload)
        return customers.map((customer) => customer.id === updatedCustomer.id ? updatedCustomer : customer)
    }
    if (action.type === CustomerActionType.DELETED) {
        return customers.filter((customer) => customer.id !== JSON.parse(action.payload))
    }

    return customers;
}