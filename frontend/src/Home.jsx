import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./component/Navbar.jsx";
import { Footer } from "./component/Footer.jsx";
import { useState } from "react";

export function Home() {
  const [updateAlarm, setUpdateAlarm] = useState(false);
  return (
    <Box height={"100%"}>
      <Box>
        <Navbar updateAlarm={updateAlarm} />
      </Box>
      <Box mt={"80px"} minHeight={"calc(100vh - 80px)"} position={"relative"}>
        <Box>
          <Outlet context={{ setUpdateAlarm }} />
        </Box>
        <Box>
          <Footer />
        </Box>
      </Box>
    </Box>
  );
}
