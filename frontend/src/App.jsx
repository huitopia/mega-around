import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Home } from "./Home.jsx";
import { SignUpCustomer } from "./user/SignUpCustomer.jsx";
import { SignUpBranch } from "./user/SignupBranch.jsx";
import { SignUp } from "./user/SignUp.jsx";

function MainProduct() {
  return null;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      { index: true, element: <MainProduct /> },

      // user
      { path: "signup", element: <SignUp /> },
      { path: "signup/customer", element: <SignUpCustomer /> },
      { path: "signup/branch", element: <SignUpBranch /> },
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
