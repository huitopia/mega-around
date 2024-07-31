import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./component/Navbar.jsx";
import { Footer } from "./component/Footer.jsx";

export function Home() {
  return (
    <Box h={"100%"}>
      <Box>
        <Navbar />
      </Box>
      <Box minHeight={"100vh"} position={"relative"} paddingBottom={"70px"}>
        <Outlet />
      </Box>
      <Box>
        <Footer />
      </Box>
    </Box>
  );
}
