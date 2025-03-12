import { FormEvent, useState } from "react";
import { ProductCreate } from "../types/Product";
import { useProduct } from "../hooks/useProducts";

export const CreateProduct = () => {
  const [product, setProduct] = useState<ProductCreate>({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    category: "",
    image: "",
  });
  const { createProductHandler } = useProduct()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await createProductHandler(product);
  };

  return (
    <div
    style={{
      maxWidth: "500px",
      margin: "20px auto",
      padding: "20px",
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    }}
    >
      <h2>Create new product</h2>
      <h2 style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}>
        Create Product
      </h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          onChange={handleChange}
          value={product?.name}
          required
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "16px",
          }}
        />
        <textarea
          name="description"
          placeholder="Product Description"
          value={product?.description}
          onChange={handleChange}
          required
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "16px",
            minHeight: "80px",
          }}
        />
        <input
          type="text"
          name="price"
          placeholder="Price"
          value={product?.price}
          onChange={handleChange}
          required
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "16px",
          }}
        />
        <input
          type="text"
          name="stock"
          placeholder="Stock"
          value={product?.stock}
          onChange={handleChange}
          required
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "16px",
          }}
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={product?.category}
          onChange={handleChange}
          required
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "16px",
          }}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={product?.image}
          onChange={handleChange}
          required
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "16px",
          }}
        />
        <button
          type="submit"
          style={{
            color: "#fff",
            padding: "10px",
            border: "none",
            borderRadius: "4px",
            fontSize: "16px",
            cursor: "pointer",
          }}
          
        >
          Create Product
        </button>
      </form>
    </div>
  );
};
