import { createContext, Dispatch } from "react";
import { Customer } from "../types/Customer";
import { Action } from "../reducers/CustomerReducer";


export type CustomerContextType = {
    customers: Customer[],
    dispatch: Dispatch<Action>
}

export const CustomerContext = createContext<CustomerContextType>({
    customers: [],
    dispatch: () => { }
})