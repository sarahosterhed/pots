import { Link } from "react-router";
import { Product } from "../types/Product"

type ShowProductCardProps = {
    product: Product;
}

const ProductCard = ({ product }: ShowProductCardProps) => {
    const { id, name, description, price, stock, category, image } = product;
    console.log("ProductCard rendered for:", product.id);

    return (
        <section className="product-card">
            <div>
                <Link to={`/product/${id}`}>
                    <h2>{name}</h2>
                    <img className="product-image" src={image} alt={name} width="282" />
                </Link>
                <p>{description}</p>
                <p><b>{category}</b></p>
                <div>
                    <p>{price}</p>
                    <p>{stock}</p>
                </div>
            </div>
            <button className="add-to-cart-button">Add to cart</button>
        </section>
    )
}

export default ProductCard