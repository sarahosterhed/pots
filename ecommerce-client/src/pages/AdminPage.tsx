import { OrderProvider } from "../contexts/OrderContext"
import { useState } from "react";
import { CustomerProvider } from "../contexts/CustomerContext";
import { Customers } from "../components/Admin/Customers/Customers";
import { Orders } from "../components/Admin/Orders/Orders";
import { Products } from "../components/Admin/Products/Products";
import "../styles/pages/Admin.css"

type SubPage = "customers" | "products" | "orders";

export const AdminPage = () => {
    const [activeSection, setActiveSection] = useState<SubPage>("orders");

    return (
        <div className="admin-page">
            <nav className="admin-navigation">
                <button onClick={() => setActiveSection("orders")}>Orders</button>
                <button onClick={() => setActiveSection("products")}>Products</button>
                <button onClick={() => setActiveSection("customers")}>Customers</button>
            </nav>

            {activeSection === "orders" && (
                <OrderProvider>
                    <Orders />
                </OrderProvider>
            )}
            {activeSection === "products" && <Products />}
            {activeSection === "customers" && (
                <CustomerProvider>
                    <Customers />
                </CustomerProvider>
            )}
        </div>
    )
}
