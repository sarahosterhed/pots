import { Product } from "../types/Product";

export type Action = {
    type: ActionType,
    payload: string;
}

export enum ActionType {
    LOADED,
    UPDATED,
    DELETED,
}

export const ProductReducer = ( products: Product[], action: Action) : Product[] => {
    if (action.type === ActionType.LOADED) {
        return JSON.parse(action.payload).reverse();
    }
    if (action.type === ActionType.UPDATED){
        const updatedProduct = JSON.parse(action.payload)
        return products.map((product) => product.id === updatedProduct.id ? updatedProduct : product)
    }
    if (action.type === ActionType.DELETED) {
        return products.filter((product) => product.id !== JSON.parse(action.payload))
    }

    return products;
}