import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Home } from "./Home.jsx";
import { SignUpCustomer } from "./user/SignUpCustomer.jsx";
import { SignUpBranch } from "./user/SignupBranch.jsx";
import { SignUp } from "./user/SignUp.jsx";
import { Login } from "./user/Login.jsx";
import { MainProduct } from "./MainProduct.jsx";
import { LoginBranch } from "./user/LoginBranch.jsx";
import { LoginProvider } from "./LoginProvider.jsx";

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
      { path: "login", element: <Login /> },
      { path: "login/branch", element: <LoginBranch /> },
    ],
  },
]);

function App() {
  return (
    <>
      <LoginProvider>
        <ChakraProvider>
          <RouterProvider router={router} />
        </ChakraProvider>
      </LoginProvider>
    </>
  );
}

export default App;
