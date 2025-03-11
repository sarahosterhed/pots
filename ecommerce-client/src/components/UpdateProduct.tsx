import React, { FormEvent, useEffect, useState } from 'react'
import { fetchProductById, fetchProducts, updateProduct } from '../services/productService';
import { Product } from '../types/Product';

interface UpdateProductProps {
    id: number | null;
    handleClose: () => void;
}

export const UpdateProduct = (props: UpdateProductProps) => {
  const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        if (!props.id) return;
        fetchProductById(props.id).then((data) => setProduct(data))
    }, [])

    const handleChange = ( e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setProduct((prevProduct) => {
        if (!prevProduct) return prevProduct;
        return { ...prevProduct, [name]: value };
      });
    };
    
    const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      if (!product) return;
      await updateProduct(product.id, product);
      props.handleClose()
    };
  
    return (
      <div>
        <h2>Update product</h2>
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
          <button type="submit">Update product</button>

        </form>
      </div>
    );
  };

