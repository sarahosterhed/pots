import { createContext, Dispatch, PropsWithChildren, useEffect, useReducer } from "react";
import { CartReducer, ICartAction } from "../reducers/CartReducer";
import { CartItem } from "../types/CartItem";
import { getFromLocalStorage, saveTolocalStorage } from "../utils/localStorageUtils";

export interface ICartContext {
  cart: CartItem[];
  cartDispatch: Dispatch<ICartAction>;
  cartQuantity: number
}

const CartContext = createContext<ICartContext>({
  cart: [],
  cartDispatch: () => null,
  cartQuantity: 0,
});

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [cart, cartDispatch] = useReducer( CartReducer, [], 
    () => { 
    const cachedCart = getFromLocalStorage('cart');
    return cachedCart ?? [];
  }
);

const cartQuantity = cart.reduce((quantity, cartItem) => quantity + cartItem.quantity, 0)

  useEffect(() => {
    saveTolocalStorage('cart', cart)
  }, [cart])

  return (
    <CartContext.Provider value={{ cart, cartDispatch, cartQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;