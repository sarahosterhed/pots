import { Products } from "../components/Products/Products"
import { Customers } from "../components/Customers/Customers"
import { Orders } from "../components/Orders/Orders"
import { OrderProvider } from "../contexts/OrderContext"

export const AdminPage = () => {
    return (
        <div>
            <Customers />
            <Products />
            <OrderProvider>
                <Orders />
            </OrderProvider>
        </div>
    )
}
