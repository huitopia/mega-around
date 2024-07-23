import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Home } from "./Home.jsx";
import { ProductUpload } from "./product/ProductUpload.jsx";
import { MainProduct } from "./MainProduct.jsx";
import { ProductList } from "./product/ProductList.jsx";
import Stamp from "./event/Stamp.jsx";
import { theme } from "./component/css/Theme.jsx";
import { Order } from "./order/Order.jsx";
import { OrderList } from "./order/OrderList.jsx";
import { OrderDetail } from "./order/OrderDetail.jsx";
import { ProductUpdate } from "./product/ProductUpdate.jsx";
import { Cart } from "./cart/Cart.jsx";
import { OrderProvider } from "./order/component/OrderProvider.jsx";
import { BranchPage } from "./order/BranchPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      // product
      { index: true, element: <MainProduct /> },
      { path: "product", element: <ProductUpload /> },
      { path: "product/list", element: <ProductList /> },
      { path: "product/:productId", element: <ProductUpdate /> },
      // event
      { path: "/stamp", element: <Stamp /> },
      // order
      { path: "/order", element: <Order /> },
      { path: "/order/list", element: <OrderList /> },
      { path: "/order/:id", element: <OrderDetail /> },
      // cart
      { path: "cart", element: <Cart /> },
      // branch_order
      { path: "branch/order", element: <BranchPage /> },
    ],
  },
]);

function App() {
  return (
    <>
      <OrderProvider>
        <ChakraProvider theme={theme}>
          <RouterProvider router={router} />
        </ChakraProvider>
      </OrderProvider>
    </>
  );
}

export default App;
