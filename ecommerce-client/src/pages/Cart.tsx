import { useContext, useReducer, useState } from "react";
import { cartActionType, CartReducer } from "../reducers/CartReducer";
import { CartItem } from "../types/CartItem";
import CartContext from "../contexts/CartContext";
import { Product } from "../types/Product";

export const Cart = () => {
  const { cart, cartDispatch } = useContext(CartContext);
  const [ cartTotal, setCartTotal] = useState<number>(0)

  const handleChangeQuantity = (product: Product, quantity: number) => {
    cartDispatch({
      type: cartActionType.CHANGE_QUANTITY,
      payload: { product, quantity },
    });
  };

  const handleRemoveFromCart = (product: Product) => {
    cartDispatch({
      type: cartActionType.REMOVE_ITEM,
      payload: product,
    });
  };

  const handleResetCart = () => {
    cartDispatch({
      type: cartActionType.RESET_CART,
      payload: null,
    });
  };

  const totalSum = cart.reduce((sum, cartItem) => sum + cartItem.product.price * cartItem.quantity, 0)

  console.log(cart);

  return (
    <div>
      <h2>Cart</h2>
      {cart.map((cartItem: CartItem) => (
        <div key={cartItem.product.id}>
          <h3>{cartItem.product.name}</h3>
          <div>
            <button
              onClick={() =>
                cartItem.product.id !== null &&
                handleChangeQuantity(cartItem.product, 1)
              }
            >
              +
            </button>
            <p>x {cartItem.quantity}</p>
            <button
              onClick={() =>
                cartItem.product.id !== null &&
                handleChangeQuantity(cartItem.product, -1)
              }
            >
              -
            </button>
            <p>{cartItem.product.price} sek</p>
            <p>Total: {cartItem.quantity * cartItem.product.price}kr</p>
            <button
              onClick={() =>
                cartItem.product.id !== null &&
                handleRemoveFromCart(cartItem.product)
              }
              className="bg-red-700 text-white"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
          <div>
            <h3>Bag total</h3>
            <p>Total: : {totalSum} sek</p>
          </div>
      <button onClick={handleResetCart}>Reset Cart</button>
    </div>
  );
};
