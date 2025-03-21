import { createContext, Dispatch, PropsWithChildren, useReducer } from "react"
import { CheckoutAction, CheckoutReducer } from "../reducers/CheckoutReducer";

export type CheckoutContextType = {
    checkoutStage: number;
    dispatch: Dispatch<CheckoutAction>
}

const CheckoutContext = createContext<CheckoutContextType>({
    checkoutStage: 0,
    dispatch: () => { }
})

export const CheckoutProvider = ({ children }: PropsWithChildren) => {
    const [checkoutStage, dispatch] = useReducer(CheckoutReducer, 0)

    return (
        <CheckoutContext.Provider value={{ checkoutStage, dispatch }}>
            {children}
        </CheckoutContext.Provider>
    )
}

export default CheckoutContext;