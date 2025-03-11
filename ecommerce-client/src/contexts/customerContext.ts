import { createContext, Dispatch } from "react";
import { Customer } from "../types/Customer";
import { Action } from "../reducers/CustomerReducer";


export type CustomerContextType = {
    customers: Customer[],
    // customer: Customer,
    dispatch: Dispatch<Action>
}

export const CustomerContext = createContext<CustomerContextType>({
    customers: [],
    // customer: {
    //             id: 0, // or some other placeholder value
    //     firstname: '',
    //     lastname: '',
    //     email: '',
    //     password: '',
    //     phone: '',
    //     street_address: '',
    //     postal_code: '',
    //     city: '',
    //     country: '',
    //     created_at: ''
    // },
    dispatch: () => { }
})