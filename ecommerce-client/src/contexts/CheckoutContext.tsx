import { createContext, Dispatch, PropsWithChildren, useReducer } from "react"
import { CheckoutAction, CheckoutReducer } from "../reducers/CheckoutReducer";

export type CheckoutContextType = {
    checkoutStage: number;
    checkoutDispatch: Dispatch<CheckoutAction>
}

const CheckoutContext = createContext<CheckoutContextType>({
    checkoutStage: 1,
    checkoutDispatch: () => { }
})

export const CheckoutProvider = ({ children }: PropsWithChildren) => {
    const [checkoutStage, checkoutDispatch] = useReducer(CheckoutReducer, 1)

    return (
        <CheckoutContext.Provider value={{ checkoutStage, checkoutDispatch }}>
            {children}
        </CheckoutContext.Provider>
    )
}

export default CheckoutContext;