import { CartItem } from "../types/CartItem";
import { saveTolocalStorage } from "../utils/localStorageUtils";

export interface ICartAction {
  type: cartActionType;
  payload: CartItem;
}

export enum cartActionType {
  ADD_ITEM,
  REMOVE_ITEM,
  CHANGE_QUANTITY,
  RESET_CART,
}

export const CartReducer = (cart: CartItem[], action: ICartAction) => {
  const { type, payload } = action;

  switch (type) {
    case cartActionType.ADD_ITEM: {
      const cartItemExists = cart.find(
        (cartItem) => cartItem.product.id == payload.product.id
      );

      console.log("payload", payload);
      // console.log("cartItemExists", cartItemExists);
      console.log("cart", cart);

      // const newCartItems = [...cart, payload];
      // console.log("new cart items", newCartItems);
      if (!cartItemExists) {
        console.log("cartItemExists", cartItemExists)
        return [...cart, payload];
        
      } else {
        
        return cart.map((cartItem) =>
          cartItem.product.id === payload.product.id
        ? {
          ...cartItem,
          quantity: cartItem.quantity + (payload.quantity || 1),
        }
        : cartItem
      );
      // saveTolocalStorage("Cart", JSON.stringify(cart));
      }

    }

    case cartActionType.CHANGE_QUANTITY: {
      return cart
        .map((cartItem) => {
          if (cartItem.product.id === payload.product.id) {
            const totalQuantity = cartItem.quantity + payload.quantity;
            if (totalQuantity <= 0) {
              return null;
            }
            return {
              ...cartItem,
              quantity: totalQuantity,
            };
          }
          return cartItem;
        })
        .filter((cartItem) => cartItem !== null);
    }

    case cartActionType.REMOVE_ITEM: {
      return cart.filter(
        (cartItem) => cartItem.product.id !== payload.product.id
      );
    }

    case cartActionType.RESET_CART: {
      return [];
    }

    default:
      return cart;
  }
};
