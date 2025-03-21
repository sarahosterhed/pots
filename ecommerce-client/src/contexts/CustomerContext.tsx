import { createContext, Dispatch, PropsWithChildren, useReducer } from "react";
import { Customer } from "../types/Customer";
import { CustomerAction, CustomerReducer } from "../reducers/CustomerReducer";


export type CustomerContextType = {
    customers: Customer[],
    dispatch: Dispatch<CustomerAction>
}

const CustomerContext = createContext<CustomerContextType>({
    customers: [],
    dispatch: () => { }
})


export const CustomerProvider = ({ children }: PropsWithChildren) => {
    const [customers, dispatch] = useReducer(CustomerReducer, [])

    return (
        <CustomerContext.Provider value={{ customers, dispatch }}>
            {children}
        </CustomerContext.Provider>
    )
}

export default CustomerContext;