import { Customer } from "../types/Customer";
import axios from "axios";
const BASE_URL = "http://localhost:3000";


export const getCustomers = async (): Promise<Customer[]> => {
    try {
        const response = await axios.get<Customer[]>(`${BASE_URL}/customers`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.log(error)
        throw error;
    }
}