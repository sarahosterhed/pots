import React, { FormEvent, useContext, useEffect, useState } from "react";
import { ProductContext } from "../../contexts/productContext";
import { useProduct } from "../../hooks/useProducts";
import { ActionType } from "../../reducers/CustomerReducer";
import { Product } from "../../types/Product";


interface UpdateProductProps {
  id: number;
  handleClose: () => void;
}

export const UpdateProduct = (props: UpdateProductProps) => {
  const [updatedProduct, setUpdatedProduct] = useState<Product>({
    id: 0,
    name: "",
    description: "",
    price: 0,
    stock: 0,
    category: "",
    image: "",
    created_at: ""
  });
  const { dispatch } = useContext(ProductContext)
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    dispatch({
      type: ActionType.UPDATED,
      payload: JSON.stringify(updatedProduct)
    })
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
          defaultValue={updatedProduct?.name}
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
          defaultValue={updatedProduct?.description}
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
          defaultValue={updatedProduct?.price}
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
          defaultValue={updatedProduct?.stock}
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
          defaultValue={updatedProduct?.category}
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
          defaultValue={updatedProduct?.image}
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

