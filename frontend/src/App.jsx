import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {ChakraProvider} from "@chakra-ui/react";
import {Home} from "./Home.jsx";
import {ProductUpload} from "./product/ProductUpload.jsx";
import {MainProduct} from "./MainProduct.jsx";
import {ProductList} from "./product/ProductList.jsx";
import Stamp from "./event/Stamp.jsx";
import {theme} from "./component/css/Theme.jsx";
import {Order} from "./order/Order.jsx";
import {OrderList} from "./order/OrderList.jsx";
import {OrderDetail} from "./order/OrderDetail.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      // product
      { index: true, element: <MainProduct /> },
      { path: "product", element: <ProductUpload /> },
      { path: "product/list", element: <ProductList /> },
      // event
      { path: "/stamp", element: <Stamp /> },
      // order
      { path: "/order", element: <Order /> },
      { path: "/order/list", element: <OrderList /> },
      {path : "/order/:id", element: <OrderDetail/>}
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
