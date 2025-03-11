import { useEffect, useState } from "react";
import { deleteProduct, fetchProducts } from "../services/productService";
import { Product } from "../types/Product";
import { UpdateProduct } from "./UpdateProduct";

export const Products = () => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [updateProductId, setUpdateProductId] = useState<number | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    console.log("useEffect is running");
    const getAllproducts = async () => {
      const data = await fetchProducts();
      console.log(data);
      setProducts(data);
    };
    getAllproducts();
  }, []);

  const deleteProductHandler = async (id: number) => {
    await deleteProduct(id);
    const updatedProducts = products?.filter((product) => product.id !== id);
    if (updatedProducts) {
      setProducts(updatedProducts);
    }
  };

  const handleClick = (id: number) => {
    setUpdateProductId(id);
    handleOpen();
  };

  return (
    <div>
      <h2>Manage Puns</h2>
      <section id="pun-list">
        {open ? (
          <UpdateProduct id={updateProductId} handleClose={handleClose} />
        ) : (
          products?.map((p) => (
            <article className="list-group-item" key={p.id}>
              <section>
                <p>{p.name}</p>
                <p>{p.description}</p>
                <p>{p.price}</p>
                <p>{p.stock}</p>
                <p>{p.category}</p>
                <p>{p.created_at}</p>
                <button
                  onClick={() => {
                    deleteProductHandler(p.id);
                  }}
                >
                  Delete
                </button>
                <button onClick={() => handleClick(p.id)}>Update</button>
              </section>
            </article>
          ))
        )}
      </section>
    </div>
  );
};
