import { createContext, Dispatch, PropsWithChildren, useEffect, useReducer } from 'react';
import { Product } from "../types/Product"
import { Action, ActionType } from '../reducers/CustomerReducer';
import { ProductReducer } from '../reducers/ProductReducer';
import { useProduct } from '../hooks/useProducts';

export type ProductContextType = {
    products: Product[],
    dispatch: Dispatch<Action>
}


const ProductContext = createContext<ProductContextType>({
    products: [],
    dispatch: () => { }
});


export const ProductProvider = ({ children }: PropsWithChildren) => {
    const [products, dispatch] = useReducer(ProductReducer, []);
    const { fetchProductsHandler } = useProduct()

    useEffect(() => {
        if (products.length > 0) return;

        const getData = async () => {
            const data = await fetchProductsHandler();
            dispatch({
                type: ActionType.LOADED,
                payload: JSON.stringify(data),
            });

        };
        getData();

    }, [products, fetchProductsHandler]);

    return (
        <ProductContext.Provider value={{ products, dispatch }}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductContext;