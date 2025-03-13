import { RouterProvider } from 'react-router'
import './App.css'
import { router } from './Router'
import { ProductContext } from './contexts/productContext'
import { useReducer } from 'react';
import { ProductReducer } from './reducers/ProductReducer';

function App() {

  const [products, dispatch] = useReducer(ProductReducer, []);

  return (
    <>    <ProductContext.Provider value={{ products, dispatch }}>
      <RouterProvider router={router}></RouterProvider>
    </ProductContext.Provider>
    </>
  )
}

export default App
