export type CheckoutPayload = {
    lineItems: CheckoutLineItem[];
    orderId: number;
    orderedProducts: OrderedProduct[]
}

export type CheckoutLineItem = {
    price_data: CheckoutPriceData;
    quantity: number;
};

export type CheckoutPriceData = {
    currency: CheckoutCurrency;
    product_data: CheckoutProductData;
    unit_amount: number;
}

export enum CheckoutCurrency {
    SEK = "SEK",
    EUR = "EUR"
}

export type CheckoutProductData = {
    name: string;
}

export type OrderedProduct = {
    product_id: number;
    quantity: number;
}