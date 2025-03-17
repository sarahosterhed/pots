import { RouterProvider } from "react-router";
import "./App.css";
import { router } from "./Router";
import { ProductProvider } from "./contexts/ProductContext";
import { CartProvider } from "./contexts/CartContext";

function App() {
  return (
    <>
      <ProductProvider>
        <CartProvider>
          <RouterProvider router={router}></RouterProvider>
        </CartProvider>
      </ProductProvider>
    </>
  );
}

export default App;
