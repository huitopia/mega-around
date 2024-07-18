import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Home } from "./Home.jsx";
import { ProductUpload } from "./product/ProductUpload.jsx";
import { MainProduct } from "./MainProduct.jsx";
import { ProductList } from "./product/ProductList.jsx";
import Stamp from "./event/Stamp.jsx";
import { theme } from "./component/css/Theme.jsx";
import { ProductDetail } from "./product/ProductDetail.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      // product
      { index: true, element: <MainProduct /> },
      { path: "product", element: <ProductUpload /> },
      { path: "product/list", element: <ProductList /> },
      { path: "product/:productId", element: <ProductDetail /> },
      // event
      { path: "/stamp", element: <Stamp /> },
    ],
  },
]);

function App() {
  return (
    <>
      <ChakraProvider theme={theme}>
        <RouterProvider router={router} />
      </ChakraProvider>
    </>
  );
}

export default App;
