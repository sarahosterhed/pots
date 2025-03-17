import { useContext } from "react";
import ProductCard from "./ProductCard";
import ProductContext from "../contexts/ProductContext";

export const DisplayProducts = () => {
  const { products } = useContext(ProductContext);

  return (
    <>
      <section className="products-wrapper">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </>
  );
};
