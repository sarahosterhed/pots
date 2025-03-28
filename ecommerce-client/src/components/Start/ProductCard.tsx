import { Link } from "react-router";
import { Product } from "../../types/Product";
import { useContext } from "react";
import { cartActionType } from "../../reducers/CartReducer";
import CartContext from "../../contexts/CartContext";

type ShowProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ShowProductCardProps) => {
  const { id, name, description, price, stock, category, image } = product;
  const { cartDispatch } = useContext(CartContext);

  const handleAddToCart = (product: Product, quantity: number) => {
    console.log("payload = product:", product, "quantity:", quantity);
    cartDispatch({
      type: cartActionType.ADD_ITEM,
      payload: { product, quantity },
    });
  };

  return (
    <section className="product-card">
      <div>
        <Link to={`/product/${id}`}>
          <h2>{name}</h2>
          <img className="product-image" src={image} alt={name} />
        </Link>
        <p>{description}</p>
        <p>
          <b>{category}</b>
        </p>
        <div>
          <p>{price}</p>
          <p>{stock}</p>
        </div>
      </div>
      <button
        className="add-to-cart-button"
        onClick={() => handleAddToCart(product, 1)}
      >
        Add to cart
      </button>
    </section>
  );
};

export default ProductCard;
