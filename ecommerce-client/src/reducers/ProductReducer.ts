import { Product } from "../types/Product";

export type ProductAction = {
    type: ProductActionType,
    payload: string;
}

export enum ProductActionType {
    LOADED,
    UPDATED,
    DELETED,
}

export const ProductReducer = (products: Product[], action: ProductAction): Product[] => {
    if (action.type === ProductActionType.LOADED) {
        return JSON.parse(action.payload).reverse();
    }
    if (action.type === ProductActionType.UPDATED) {
        const updatedProduct = JSON.parse(action.payload)
        return products.map((product) => product.id === updatedProduct.id ? updatedProduct : product)
    }
    if (action.type === ProductActionType.DELETED) {
        return products.filter((product) => product.id !== JSON.parse(action.payload))
    }

    return products;
}