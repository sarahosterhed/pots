import { createBrowserRouter } from "react-router";
import { Layout } from "./pages/Layout";
import { NotFound } from "./pages/NotFound";
import { HomePage } from "./pages/HomePage"
import { ProductPage } from "./pages/ProductPage";
import { AdminPage } from "./pages/AdminPage";
import { Cart } from "./pages/Cart";
import { OrderDetailsPage } from "./pages/OrderDetailsPage";
import { CheckoutPage } from "./pages/CheckoutPage";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <NotFound />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/product/:id",
                element: <ProductPage />
            },
            {
                path: "/admin",
                element: <AdminPage />
            },
            {
                path: "/cart",
                element: <Cart />
            },
            {
                path: "/admin/order/:id",
                element: <OrderDetailsPage />
            },
            {
                path: "/checkout",
                element: <CheckoutPage />
            }
        ]

    }
])