import { Box, Center, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function Navbar() {
  const navigate = useNavigate();
  return (
    <Flex>
      <Box>
        <Center backgroundColor={"yellow"}>Home</Center>
      </Box>
    </Flex>
  );
}
