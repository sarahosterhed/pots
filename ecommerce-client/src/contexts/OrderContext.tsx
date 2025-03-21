import { Order } from '../types/Order';
import { createContext, Dispatch, PropsWithChildren, useReducer } from 'react';
import { OrderAction, OrderReducer } from '../reducers/OrderReducer';

export type OrderContextType = {
    orders: Order[],
    dispatch: Dispatch<OrderAction>
}

const OrderContext = createContext<OrderContextType>({
    orders: [],
    dispatch: () => { }
})


export const OrderProvider = ({ children }: PropsWithChildren) => {
    const [orders, dispatch] = useReducer(OrderReducer, []);

    return (
        <OrderContext.Provider value={{ orders, dispatch }}>
            {children}
        </OrderContext.Provider>
    )
}

export default OrderContext;