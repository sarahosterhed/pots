import { useContext } from "react";
import ProductCard from "./ProductCard";
import ProductContext from "../../contexts/ProductContext";
import { IndexedItem } from "../../types/IndexedItem";

type DisplayProductsProps = {
  filteredProducts: IndexedItem[]
}

export const DisplayProducts = ({ filteredProducts }: DisplayProductsProps) => {
  const { products } = useContext(ProductContext);

  const isFiltered = filteredProducts && filteredProducts.length > 0;

  const productsToDisplay = isFiltered
    ? filteredProducts.map((item) => {
      const matchedProduct = products.find((product) =>
        item.title.includes(product.name)
      );
      return matchedProduct ? matchedProduct : null;
    }).filter((product) => ((product) !== null))
    : products;

  return (
    <>
      <section className="products-wrapper">
        {productsToDisplay.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </>
  );
};
