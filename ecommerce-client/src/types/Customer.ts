export type Customer = {
    id: number
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    phone: string;
    street_adress: string;
    postal_code: string;
    city: string;
    country: string;
    created_at: string;
}

export type CustomerCreate = Omit<Customer, "id" | "created_at">

export type CustomerEdit = Omit<Customer, "id" | "created_at">