import { useState } from "react";
import { Product, ProductCreate, ProductUpdate } from "../types/Product";
import {
  createProduct,
  deleteProduct,
  fetchProductById,
  fetchProducts,
  updateProduct,
} from "../services/productService";

export const useProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchProductsHandler = async () => {
    setIsLoading(true);
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (error) {
      setError("Error fetching products");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProductByIdHandler = async (id: number) => {
    setIsLoading(true);
    try {
      const data = await fetchProductById(id);
      console.log(data);
      return data;
    } catch (error) {
      setError("Error fetching product");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProductHandler = async (id: number) => {
    setIsLoading(true);
    try {
      await deleteProduct(id);
      const updatedProducts = products?.filter((product) => product.id !== id);
      setProducts(updatedProducts);
    } catch (error) {
      setError("Error: Could not delete product");
    } finally {
      setIsLoading(false);
    }
  };

  const updateProductHandler = async (id: number, payload: ProductUpdate) => {
    setIsLoading(true);
    try {
      await updateProduct(id, payload);
      setProducts((prevProducts) =>
        prevProducts.map((p) => (p.id == id ? { ...p, ...payload } : p))
      );
    } catch (error) {
      setError("Error: Could not update product");
    } finally {
      setIsLoading(false);
    }
  };


  const createProductHandler = async (payload: ProductCreate) => {
    setIsLoading(true);
    try {
      await createProduct(payload);
    } catch (error) {
      setError("Error: Could not delete product");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    products,
    isLoading,
    error,
    fetchProductsHandler,
    deleteProductHandler,
    updateProductHandler,
    fetchProductByIdHandler,
    createProductHandler
  };
};
