import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./component/Navbar.jsx";
import { Footer } from "./component/Footer.jsx";
import { useState } from "react";

export function Home() {
  const [updateAlarm, setUpdateAlarm] = useState(false);
  return (
    <Box h={"100%"}>
      <Box>
        <Navbar updateAlarm={updateAlarm} />
      </Box>
      <Box minHeight={"100vh"} position={"relative"} paddingBottom={"70px"}>
        <Outlet context={{ setUpdateAlarm, updateAlarm }} />
      </Box>
      <Box>
        <Footer />
      </Box>
    </Box>
  );
}
