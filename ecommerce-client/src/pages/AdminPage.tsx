
import { CreateProduct } from "../components/CreateProduct"
import { Products } from "../components/Products"
import { Customers } from "../components/Customers"

export const AdminPage = () => {
    return (
        <div>
            <Customers />
            <Products/>
            <CreateProduct/>
        </div>
    )
}
