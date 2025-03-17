import {  createContext, Dispatch, PropsWithChildren, useReducer } from "react";
import { CartReducer, ICartAction } from "../reducers/CartReducer";
import { CartItem } from "../types/CartItem";

export interface ICartContext {
    cart: CartItem[],
    cartDispatch: Dispatch<ICartAction>
}

const CartContext = createContext<ICartContext>({cart:[], cartDispatch: () => null})

export const CartProvider = ({children}: PropsWithChildren) => {
    const [cart, cartDispatch] = useReducer(CartReducer, [], () => {

    const cachedCart = localStorage.getItem('Cart')
    return cachedCart ? JSON.parse(cachedCart) : []
    });

    return (
        <CartContext.Provider value={{cart, cartDispatch}}>
            {children}
        </CartContext.Provider>
    )
}