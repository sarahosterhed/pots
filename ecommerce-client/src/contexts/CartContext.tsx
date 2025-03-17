import { createContext, Dispatch, PropsWithChildren, useEffect, useReducer } from "react";
import { CartReducer, ICartAction } from "../reducers/CartReducer";
import { CartItem } from "../types/CartItem";
import { getFromLocalStorage, saveTolocalStorage } from "../utils/localStorageUtils";

export interface ICartContext {
  cart: CartItem[];
  cartDispatch: Dispatch<ICartAction>;
}

const CartContext = createContext<ICartContext>({
  cart: [],
  cartDispatch: () => null,
});

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [cart, cartDispatch] = useReducer( CartReducer, [], 
    () => { 
      const cachedCart = getFromLocalStorage('cart');
      return cachedCart ?? [];
    }
  );

  useEffect(() => {
    saveTolocalStorage('cart', cart)
  }, [cart])

  return (
    <CartContext.Provider value={{ cart, cartDispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;