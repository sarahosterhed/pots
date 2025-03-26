export interface ICheckoutLineItem {
    price_data: ICheckoutPriceData;
    quantity: number;
};

export interface ICheckoutPriceData {
    currency: CheckoutCurrency;
    product_data: ICheckoutProductData;
    unit_amount: number;
}

export enum CheckoutCurrency {
    SEK = "SEK",
    EUR = "EUR"
}

export interface ICheckoutProductData {
    name: string;
}