import { useContext, useEffect } from "react";
import { Link } from "react-router";
import OrderContext from "../../../contexts/OrderContext";
import { useOrders } from "../../../hooks/useOrders";
import { OrderActionType } from "../../../reducers/OrderReducer";
import { BeatLoader } from "react-spinners";

export const Orders = () => {
  const { orders, dispatch } = useContext(OrderContext)
  const { fetchOrdersHandler, isLoading } = useOrders();

  useEffect(() => {
    const getData = async () => {
      const data = await fetchOrdersHandler();
      console.log(data);
      dispatch({
        type: OrderActionType.ORDERS_LOADED,
        payload: JSON.stringify(data),
      });
    };
    if (orders.length > 0) return;
    getData();
  });

  return (
    <>
      <h2>Manage Orders</h2>
      {isLoading &&
        <div className="center-content">
          <BeatLoader color="white" />
        </div>
      }
      <section className="wrapper">
        {orders.map((order) => (
          <Link to={`/admin/order/${order.id}`} key={order.id}>
            <div className="card">
              <p><span>Order ID:</span> <span>{order.id}</span></p>
              <p><span>Order Status:</span> <span>{order.order_status}</span></p>
              <p className="two-lines"><span>Payment ID:</span> <span>{order.payment_id}</span></p>
              <p><span>Payment Status:</span> <span>{order.payment_status}</span></p>
              <p className="two-lines"><span>Created at:</span> <span>{order.created_at}</span></p>
              <p><span>Total Price:</span> <span>{order.total_price} :-</span></p>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
};
