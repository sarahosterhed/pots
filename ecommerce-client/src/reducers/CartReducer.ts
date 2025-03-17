import { Product } from './../types/Product';
import { CartItem } from "../types/CartItem";
import { saveTolocalStorage } from '../utils/localSTorageUtils';

export interface ICartAction {
  type: cartActionType;
  payload: Product | any;
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
            (cartItem) => cartItem.product_id === payload.product.id
        );
        console.log(cart)

        if (!cartItemExists) return [...cart, payload];
        
        const cachedData = {
          cart: cart,
        }
        saveTolocalStorage('Cart', JSON.stringify(cachedData))

        return cart.map((cartItem) =>
            cartItem.product_id === payload.product_id
        ? { ...cartItem, quantity: cartItem.quantity + (payload.quantity || 1) }
        : cartItem

    );

    }

    case cartActionType.CHANGE_QUANTITY: {
      return cart.map((cartItem) => {
        if (cartItem.product_id === payload.product.id) {
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
      }).filter(cartItem => cartItem !== null);
    }

    case cartActionType.REMOVE_ITEM: {
      return cart.filter(
        (cartItem) => cartItem.product_id !== payload.product.id
      );
    }

    case cartActionType.RESET_CART: {
      return [];
    }

    default:
      return cart;
  }

};





