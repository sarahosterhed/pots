import { Link, useParams } from "react-router"
import { useContext } from "react";
import ProductContext from "../contexts/ProductContext";

export const ProductPage = () => {
    const { id } = useParams();
    const { products } = useContext(ProductContext);
    const product = products.find((product) => product.id === Number(id));


    return (
        <>
            <section>
                <h2>{product?.name}</h2>
                <p>{product?.description}</p>
                <img src={product?.image} alt={product?.name} width="400" />
                <p><b>{product?.category}</b></p>
                <p>{product?.stock} items left</p>
                <h2>{product?.price} kr</h2>
            </section>
            <Link to={"/"}><button>Back</button></Link>
        </>
    )
}
