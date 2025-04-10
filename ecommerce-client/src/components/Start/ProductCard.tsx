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
      <div className="content">
        <Link to={`/product/${id}`}>
          <h2>{name}</h2>
          <img className="product-image" src={`/images/${image}`} alt={name} />
        </Link>
        <p>{description}</p>
        <div className="category">
          <p>{category}</p>
        </div>
        <div>
          <p><span>Price:</span> <span>{price} kr</span></p>
          <p><span>In stock:</span> <span>{stock}</span></p>
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
