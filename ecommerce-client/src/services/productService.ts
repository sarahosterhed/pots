import axios from "axios";
import { Product, ProductCreate } from "../types/Product";

const API_URL = "http://localhost:3000";

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};

export const fetchProductById = async (id: number): Promise<Product> => {
  try {
    const response = await axios.get(`${API_URL}/products/${id}`);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};

export const deleteProduct = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/products/${id}`);
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};

export const createProduct = async (payload: ProductCreate): Promise<Product> => {
  try {
    const response = await axios.post(`${API_URL}/products`, payload);
    return response.data
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};

export const updateProduct = async ( id: number, payload: ProductCreate): Promise<Product> => {
  try {
    const response = await axios.patch(`${API_URL}/products/${id}`, payload);
    console.log("Product updated", response.data);
    return response.data
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};

