import { useContext, useState } from "react";
import { useProduct } from "../../hooks/useProducts";
import { ActionType } from "../../reducers/CustomerReducer";
import { CreateProduct } from "./CreateProduct";
import { UpdateProduct } from "./UpdateProduct";
import ProductContext from "../../contexts/ProductContext";

export const Products = () => {
  const { deleteProductHandler } = useProduct();
  const { products, dispatch } = useContext(ProductContext);
  const [updateProductId, setUpdateProductId] = useState<number | null>(null);
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const handleOpen = () => setOpenCreate(true);
  const handleUpdateProduct = (id: number) => {
    setUpdateProductId(id);
    handleOpen();
  };

  const handleDeleteProduct = async (id: number) => {
    await deleteProductHandler(id);
    dispatch({
      type: ActionType.DELETED,
      payload: JSON.stringify(id),
    });
  };

  const handleCreateProduct = () => {
    handleOpen();
  };

  return (
    <div>
      {openCreate ? (
        <CreateProduct handleClose={() => setOpenCreate(false)} />
      ) : (
        <button onClick={handleCreateProduct}>Create new product</button>
      )}
      <h2>Manage Products</h2>
      <section id="product-list">
        {products.map((p) => (
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
            {updateProductId === p.id ? (

              <UpdateProduct
                productId={p.id}
                setUpdateProductId={setUpdateProductId}
              />
            ) : (
              <section
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                }}
              >
                <p>Name: {p.name}</p>
                <p>Description: {p.description}</p>
                <p>Price: {p.price} SEK</p>
                <p>Stock: {p.stock}</p>
                <p>Category: {p.category}</p>
                <p>Created At: {p.created_at}</p>
                <div
                  style={{ marginTop: "10px", display: "flex", gap: "10px" }}
                >
                  <button onClick={() => handleDeleteProduct(p.id)}>
                    Delete
                  </button>
                  <button onClick={() => handleUpdateProduct(p.id)}>
                    Edit
                  </button>
                </div>
              </section>
            )}
          </article>
        ))}
      </section>
    </div>
  );
};
