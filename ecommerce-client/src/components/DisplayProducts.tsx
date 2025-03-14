import { useContext, useEffect } from "react"
import ProductCard from "./ProductCard"
import { ProductContext } from "../contexts/ProductContext"
import { ActionType } from "../reducers/CustomerReducer";
import { useProduct } from "../hooks/useProducts";

export const DisplayProducts = () => {
    const { fetchProductsHandler } = useProduct()
    const { products, dispatch } = useContext(ProductContext);

    useEffect(() => {
        const getData = async () => {
            const data = await fetchProductsHandler();
            dispatch({
                type: ActionType.LOADED,
                payload: JSON.stringify(data),
            });
        };
        getData();
    }, []);

    return (
        <>
            <section className="products-wrapper">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />

                ))}
            </section>
        </>
    )
}
