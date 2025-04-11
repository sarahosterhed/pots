import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router"
import { useContext } from "react";
import ProductContext from "../contexts/ProductContext";
import { BeatLoader } from "react-spinners";
import "../styles/pages/ProductPage.css"
import { cartActionType } from "../reducers/CartReducer";
import { Product } from "../types/Product";
import CartContext from "../contexts/CartContext";
import addToCartIcon from "../assets/icons/add-to-cart-button.svg"

export const ProductPage = () => {
    const { id } = useParams();
    const { cartDispatch } = useContext(CartContext);
    const { products } = useContext(ProductContext);
    const product = products.find((product) => product.id === Number(id));

    if (products.length == 0) {
        return (
            <section>
                <BeatLoader color="white" />
            </section>
        );
    }

    if (!product) {
        return (
            <section>
                <h2>Product not found</h2>
                <Link to={"/"}><button>Back</button></Link>
            </section>
        )
    }

    const handleAddToCart = (product: Product, quantity: number) => {
        cartDispatch({
            type: cartActionType.ADD_ITEM,
            payload: { product, quantity },
        });
    };

    return (
        <section className="product-page">
            <Helmet>
                <title>{product.name} | Pots</title>
                <meta name="description" content={product.description} />
                <meta property="og:title" content={`${product.name} | Pots`} />
                <meta property="og:description" content={product.description} />
                <meta property="og:image" content={`/images/${product.image}`} />
                <meta property="og:url" content={`https://plantpots.vercel.app/product/${product.id}`} />
                <meta property="og:type" content="product" />
            </Helmet>
            <Link to={"/"}><button>Back</button></Link>
            <article>
                <img src={`/images/${product.image}`} alt={product.name} width="400" />
                <div className="product-page-details">
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <p><b>{product.category}</b></p>
                    <p>{product.stock} items left</p>
                    <h4>{product.price} kr</h4>
                    <button
                        className="add-to-cart-button"
                        onClick={() => handleAddToCart(product, 1)}
                    >
                        <img src={addToCartIcon} alt="Add to cart" />
                        Add to Cart
                    </button>
                </div>
            </article>
        </section>
    )
}
