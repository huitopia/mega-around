import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./component/Navbar.jsx";
import { Footer } from "./component/Footer.jsx";
import {useState} from "react";

export function Home() {
  const [updateAlarm, setUpdateAlarm] = useState(false);
  return (
    <Box h={"100%"}>
      <Box>
        <Navbar updateAlarm={updateAlarm}/>
      </Box>
      <Box>
        <Outlet context={{ setUpdateAlarm }}/>
      </Box>
      <Box>
        <Footer />
      </Box>
    </Box>
  );
}
