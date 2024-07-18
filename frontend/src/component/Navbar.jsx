import { Box, Center, Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function Navbar() {
  const navigate = useNavigate();
  return (
    <Flex
      h={"30px"}
      fontSize={"lg"}
      align={"center"}
      justifyContent={"space-between"}
      backgroundColor={"yellow"}
    >
      <Box>
        <Center onClick={() => navigate("/")} cursor={"pointer"}>
          <Text>Home</Text>
        </Center>
      </Box>
      <Box>
        <Center onClick={() => navigate("/product")} cursor={"pointer"}>
          <Text>상품등록</Text>
        </Center>
      </Box>
      <Box>
        <Center onClick={() => navigate("/product/list")} cursor={"pointer"}>
          <Text>상품리스트</Text>
        </Center>
      </Box>
    </Flex>
  );
}
