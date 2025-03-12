import { useEffect, useState } from "react";
import { UpdateProduct } from "./UpdateProduct";
import { useProduct } from "../hooks/useProducts";

export const Products = () => {
  const { fetchProductsHandler, products, deleteProductHandler } = useProduct();

  const [updateProductId, setUpdateProductId] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    fetchProductsHandler();
  }, []);

  const handleClick = (id: number) => {
    setUpdateProductId(id);
    console.log("id", id)
    handleOpen();
  };

  console.log(products)

  return (
    <div style={{ width: "90%", maxWidth: "800px", margin: "auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px", fontSize: "2em" }}>Manage Products</h2>
      <section id="product-list">
        {products?.map((p) => (
          <article
            key={p.id}
            className="list-group-item"
            style={{
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "8px",
              padding: "15px",
              marginBottom: "15px",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
            }}
          >
            <section style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              <p><strong>Name:</strong> {p.name}</p>
              <p><strong>Description:</strong> {p.description}</p>
              <p><strong>Price:</strong> {p.price} SEK</p>
              <p><strong>Stock:</strong> {p.stock}</p>
              <p><strong>Category:</strong> {p.category}</p>
              <p><strong>Created At:</strong> {p.created_at}</p>
              <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
                <button
                  onClick={() => deleteProductHandler(p.id)}
                  style={{ backgroundColor: "#d32f2f", color: "white" }}
                >
                  Delete
                </button>
                {open ? (
                  <UpdateProduct id={updateProductId} handleClose={handleClose} />
                ) : (
                  <button
                    onClick={() => handleClick(p.id)}
                    style={{ color: "white" }}
                  >
                    Update
                  </button>
                )}
              </div>
            </section>
          </article>
        ))}
      </section>
    </div>
  );
};
