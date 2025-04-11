import { Link } from "react-router";
import { Product } from "../../types/Product";
import { useContext } from "react";
import { cartActionType } from "../../reducers/CartReducer";
import CartContext from "../../contexts/CartContext";
import addToCartIcon from "../../assets/icons/add-to-cart-button.svg";

type ShowProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ShowProductCardProps) => {
  const { id, name, description, price, image } = product;
  const { cartDispatch } = useContext(CartContext);

  const handleAddToCart = (product: Product, quantity: number) => {
    cartDispatch({
      type: cartActionType.ADD_ITEM,
      payload: { product, quantity },
    });
  };
  return (
    <article className="product-card">
      <div className="product-image-wrapper">
        <Link to={`/product/${id}`}>
          <img src={`/images/${image}`} alt={name} />
        </Link>
      </div>
      <div className="product-card-details">
        <h3>{name}</h3>
        <p>{description}</p>
        <div className="product-card-bottom">
          <p className="product-price">{price} :-</p>
          <button
            className="add-to-cart-button"
            onClick={() => handleAddToCart(product, 1)}
          >
            <img src={addToCartIcon} alt="Add to cart" />
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
