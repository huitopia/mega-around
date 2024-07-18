import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Home } from "./Home.jsx";
import { ProductUpload } from "./product/ProductUpload.jsx";
import { MainProduct } from "./MainProduct.jsx";
import { ProductList } from "./product/ProductList.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      // product
      { index: true, element: <MainProduct /> },
      { path: "product", element: <ProductUpload /> },
      { path: "product/list", element: <ProductList /> },
    ],
  },
]);

function App() {
  return (
    <>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </>
  );
}

export default App;
