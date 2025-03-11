import { FormEvent, useState } from "react";
import { ProductCreate } from "../types/Product";
import { createProduct } from "../services/productService";

export const CreateProduct = () => {
  const [product, setProduct] = useState<ProductCreate>({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    category: "",
    image: "",
  });

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
    await createProduct(product);
  };

  return (
    <div>
      <h2>Create product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="name"
          onChange={handleChange}
          value={product?.name}
          required
        />
        <textarea
          name="description"
          placeholder="description"
          value={product?.description}
          onChange={handleChange}
          required
        />
        <label htmlFor=""></label>
        <input
          type="text"
          name="price"
          placeholder="price"
          value={product?.price}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="stock"
          placeholder="stock"
          value={product?.stock}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="category"
          value={product?.category}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="image"
          value={product?.image}
          onChange={handleChange}
          required
        />
        <button type="submit">Create product</button>
      </form>
    </div>
  );
};
