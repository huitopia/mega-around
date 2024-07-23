import { Box, Center, Flex } from "@chakra-ui/react";

export function OrderManageComp() {
  return (
    <Flex h={"180px"}>
      <Center bg={"blue"} w={"150px"}>
        <Box>신규주문</Box>
        <Box>({0})</Box>
      </Center>
      <Box bg={"gray.200"} w={"800px"}>
        주문이요~~
      </Box>
    </Flex>
  );
}
