import { Customer, CustomerCreate } from "../types/Customer";
import axios from "axios";
const CUSTOMER_URL = "http://localhost:3000/customers/";


export const fetchCustomers = async (): Promise<Customer[]> => {
    try {
        const response = await axios.get<Customer[]>(`${CUSTOMER_URL}`);
        return response.data;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export const fetchCustomerById = async (id: number): Promise<Customer> => {
    try {
        const response = await axios.get(CUSTOMER_URL + id)
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const fetchCustomerByEmail = async (email: string): Promise<Customer | null> => {
    try {
        const response = await axios.get(CUSTOMER_URL + "email/" + email)
        return response.data;
    } catch (error) {
        switch (error.status) {
            case 404:
                console.log("error 404, do nothing");
                return null;
            default:
                console.log("other error than 404")
                throw error;
        }
    }
}

export const createCustomer = async (payload: CustomerCreate): Promise<Customer> => {
    try {
        const response = await axios.post(CUSTOMER_URL, payload);
        return response.data;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export const deleteCustomer = async (id: number): Promise<void> => {
    try {
        await axios.delete(CUSTOMER_URL + id)
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const updateCustomer = async (id: number, payload: Customer) => {
    try {
        const response = await axios.patch(CUSTOMER_URL + id, payload)
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
