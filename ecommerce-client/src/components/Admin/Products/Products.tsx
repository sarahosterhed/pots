import { BeatLoader } from "react-spinners";
import ProductContext from "../../../contexts/ProductContext";
import { useProduct } from "../../../hooks/useProducts";
import { ProductActionType } from "../../../reducers/ProductReducer";
import { CreateProduct } from "./CreateProduct";
import { UpdateProduct } from "./UpdateProduct";
import { useContext, useState } from "react";

export const Products = () => {
  const { deleteProductHandler, isLoading } = useProduct();
  const { products, dispatch } = useContext(ProductContext);
  const [updateProductId, setUpdateProductId] = useState<number | null>(null);
  const [openCreate, setOpenCreate] = useState<boolean>(false);

  const handleOpen = () => setOpenCreate(true);

  const handleUpdate = (id: number) => {
    setUpdateProductId(id);
    handleOpen();
  };

  const handleDelete = async (id: number) => {
    await deleteProductHandler(id);
    dispatch({
      type: ProductActionType.DELETED,
      payload: JSON.stringify(id),
    });
  };

  const handleCreate = () => {
    handleOpen();
  };

  return (
    <>
      {isLoading &&
        <BeatLoader />
      }
      <h2>Manage Products</h2>
      {openCreate ? (
        <CreateProduct handleClose={() => setOpenCreate(false)} />
      ) : (
        <button className="admin-create-button" onClick={handleCreate}>Create new product</button>
      )}
      <section id="product-list" className="wrapper">
        {products.map((p) => (
          <article
            key={p.id}
            className="list-group-item"
          >
            {updateProductId === p.id ? (

              <UpdateProduct
                productId={p.id}
                setUpdateProductId={setUpdateProductId}
              />
            ) : (
              <section className="card">
                <p><span>Name:</span> <span>{p.name}</span></p>
                <p className="two-lines"><span>Description:</span> <span>{p.description}</span></p>
                <p><span>Price:</span> <span>{p.price} SEK</span></p>
                <p><span>Stock:</span> <span>{p.stock}</span></p>
                <p><span>Category:</span> <span>{p.category}</span></p>
                <p className="two-lines"><span>Created At:</span> <span>{p.created_at}</span></p>
                <div />
                <div className="button-wrapper-product">
                  <button onClick={() => handleDelete(p.id)}>
                    Delete
                  </button>
                  <button onClick={() => handleUpdate(p.id)}>
                    Edit
                  </button>
                </div>
              </section>
            )}
          </article>
        ))}
      </section>
    </>
  );
};
