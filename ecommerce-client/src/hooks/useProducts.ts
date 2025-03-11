import { useState } from "react";
import { Product } from "../types/Product";
import { deleteProduct, fetchProducts } from "../services/productService";

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

  



  return {
    products,
    isLoading,
    error,
    fetchProductsHandler,
    deleteProductHandler,
  };
};
