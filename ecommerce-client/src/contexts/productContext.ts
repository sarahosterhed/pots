import { createContext, Dispatch } from 'react';
import { Product } from "../types/Product"
import { Action } from '../reducers/CustomerReducer';

export type ProductContextType = {
    products: Product[],
    dispatch: Dispatch<Action>
}

export const ProductContext = createContext<ProductContextType>({
    products: [],
    dispatch: () => {}
})