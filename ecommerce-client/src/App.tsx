import { RouterProvider } from 'react-router'
import './App.css'
import { router } from './Router'
import { ProductProvider } from './contexts/ProductContext'
function App() {

  return (
    <>
      <ProductProvider>
        <RouterProvider router={router}></RouterProvider>
      </ProductProvider>
    </>
  )
}

export default App
