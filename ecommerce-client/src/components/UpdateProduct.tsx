import React, { FormEvent, useEffect, useState } from "react";
import { Product } from "../types/Product";
import { useProduct } from "../hooks/useProducts";

interface UpdateProductProps {
  id: number;
  handleClose: () => void;
}

export const UpdateProduct = (props: UpdateProductProps) => {
  const [updatedProduct, setUpdatedProduct] = useState<Product | null>(null);

  const { updateProductHandler, fetchProductByIdHandler } = useProduct();

  useEffect(() => {
    if (!props.id) return;

    const fetchData = async () => {
      const data = await fetchProductByIdHandler(props.id);
      if (data) {
        setUpdatedProduct(data);
      }
    };

    fetchData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUpdatedProduct((prevProduct) => {
      if (!prevProduct) return prevProduct;
      return { ...prevProduct, [name]: value };
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!updatedProduct) return;
    await updateProductHandler(updatedProduct.id, updatedProduct);
    props.handleClose();
  };

  return (
    <div
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        padding: "20px",
        borderRadius: "8px",
        maxWidth: "500px",
        margin: "auto",
      }}
    >
      <h2
        style={{ textAlign: "center", marginBottom: "15px", fontSize: "1.8em" }}
      >
        Update Product
      </h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          value={updatedProduct?.name ?? ""}
          required
          style={{
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={updatedProduct?.description ?? ""}
          onChange={handleChange}
          required
          style={{
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            height: "80px",
          }}
        />
        <input
          type="text"
          name="price"
          placeholder="Price"
          value={updatedProduct?.price ?? ""}
          onChange={handleChange}
          required
          style={{
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <input
          type="text"
          name="stock"
          placeholder="Stock"
          value={updatedProduct?.stock ?? ""}
          onChange={handleChange}
          required
          style={{
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={updatedProduct?.category ?? ""}
          onChange={handleChange}
          required
          style={{
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={updatedProduct?.image ?? ""}
          onChange={handleChange}
          required
          style={{
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            marginTop: "10px",
          }}
        >
          Update Product
        </button>
      </form>
    </div>
  );
};
