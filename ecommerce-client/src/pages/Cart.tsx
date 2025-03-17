import { useReducer } from "react";
import { cartActionType, CartReducer } from "../reducers/CartReducer";
import { CartItem } from "../types/CartItem";

export const Cart = () => {
  const [cart, cartDispatch] = useReducer(CartReducer, []);

  const handleChangeQuantity = (id: number, quantity: number) => {
    cartDispatch({
      type: cartActionType.CHANGE_QUANTITY,
      payload: { id, quantity },
    });
  };

  const handleRemoveFromCart = (id: number) => {
    cartDispatch({
      type: cartActionType.REMOVE_ITEM,
      payload: id,
    });
  };

  const handleResetCart = () => {
    cartDispatch({
      type: cartActionType.RESET_CART,
      payload: null,
    });
  };

  console.log(cart)

  return (
    <div>
      {cart.map((cartItem: CartItem) => (
        <div key={cartItem.id}>
          <h3>{cartItem.product_name}</h3>
          <p>{cartItem.unit_price}</p>
          <div>
            <button
              onClick={() =>
                cartItem.id !== null && handleChangeQuantity(cartItem.id, 1)
              }
            >
              +
            </button>
            <p>{cartItem.quantity}</p>
            <button
              onClick={() =>
                cartItem.id !== null && handleChangeQuantity(cartItem.id, -1)
              }
            >
              -
            </button>
            <p>
              {cartItem.quantity} X {cartItem.unit_price} kr
            </p>
            <button
              onClick={() =>
                cartItem.id !== null && handleRemoveFromCart(cartItem.id)
              }
              className="bg-red-700 text-white"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      <button onClick={handleResetCart}>Reset Cart</button>
    </div>
  );
};