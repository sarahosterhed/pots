import { RouterProvider } from "react-router";
import "./App.css";
import { router } from "./Router";
import { ProductProvider } from "./contexts/ProductContext";
import { CartProvider } from "./contexts/CartContext";
import { HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <>
      <HelmetProvider>
        <ProductProvider>
          <CartProvider>
            <RouterProvider router={router}></RouterProvider>
          </CartProvider>
        </ProductProvider>
      </HelmetProvider>
    </>
  );
}

export default App;
