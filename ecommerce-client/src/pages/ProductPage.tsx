import { useContext } from "react";
import { useParams } from "react-router"
import { ProductContext } from "../contexts/ProductContext";

export const ProductPage = () => {
    const { id } = useParams();
    const { products } = useContext(ProductContext);
    console.log(products)
    const { name, description, image, price, stock, category } = products.find((product) => product.id === Number(id))


    return (
        <section>
            <h2>{name}</h2>
        </section>
    )
}
