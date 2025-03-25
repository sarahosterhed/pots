import { createContext, Dispatch, PropsWithChildren, useReducer } from "react";
import { Customer } from "../types/Customer";
import { CustomerAction, CustomerReducer } from "../reducers/CustomerReducer";


export type CustomerContextType = {
    customers: Customer[],
    customerDispatch: Dispatch<CustomerAction>
}

const CustomerContext = createContext<CustomerContextType>({
    customers: [],
    customerDispatch: () => { }
})


export const CustomerProvider = ({ children }: PropsWithChildren) => {
    const [customers, customerDispatch] = useReducer(CustomerReducer, [])

    return (
        <CustomerContext.Provider value={{ customers, customerDispatch }}>
            {children}
        </CustomerContext.Provider>
    )
}

export default CustomerContext;