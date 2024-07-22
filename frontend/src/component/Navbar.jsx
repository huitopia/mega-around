import { Box, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function Navbar() {
  const navigate = useNavigate();
  return (
    <Flex>
      <Box backgroundColor={"yellow"}>Home</Box>
      <Box
        backgroundColor={"beige"}
        onClick={() => navigate("/signup")}
        cursor={"pointer"}
      >
        Sign up/login
      </Box>
    </Flex>
  );
}
