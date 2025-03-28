import { useContext } from "react";
import { cartActionType } from "../reducers/CartReducer";
import { CartItem } from "../types/CartItem";
import CartContext from "../contexts/CartContext";
import { Product } from "../types/Product";
import { useNavigate } from "react-router";

export const Cart = () => {
  const { cart, cartDispatch } = useContext(CartContext);
  const navigate = useNavigate();

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


  return (
    <div>
      <h2>Cart</h2>
      {cart.map((cartItem: CartItem) => (
        <div key={cartItem.product.id} className="cart-wrapper">
          <h3>{cartItem.product.name}</h3>
          <div className="cart-item">
            <button
              onClick={() =>
                cartItem.product.id !== null &&
                handleChangeQuantity(cartItem.product, -1)
              }
            >
              -
            </button>
            <p>x {cartItem.quantity}</p>
            <button
              onClick={() =>
                cartItem.product.id !== null &&
                handleChangeQuantity(cartItem.product, 1)
              }
            >
              +
            </button>
            <p>{cartItem.product.price} sek</p>
            <button
              onClick={() =>
                handleRemoveFromCart(cartItem.product)
              }
              className="bg-red-700 text-white"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      <div className="cart-wrapper">
        <h3>Bag total</h3>
        {totalSum === 0 ? <p>Your bag is empty</p> : <h3>Total: {totalSum} kr</h3>}

      </div>
      <button onClick={handleResetCart}>Reset Cart</button>
      <div>
        <button onClick={() => navigate("/checkout")}>Proceed to Checkout</button>
      </div>
    </div>
  );
};
