import {Box, Divider, Flex, Heading} from "@chakra-ui/react";
import { CartProductComp } from "./component/CartProductComp.jsx";

export function Cart() {
  return (
    <Box maxWidth="1000px" mx={"auto"}>
      <Box>
        <Heading>Cart</Heading>
      </Box>
      <Divider border={"1px solid black"} my={4} />
      <Box>
        <Flex bg={"black"} color={"white"} h={"50px"} align={"center"} p={3}>
          이대역사거리점
        </Flex>
        <Box fontWeight={"bold"} mt={5} fontSize={"30px"} mb={5}>주문 상품</Box>
        <CartProductComp />
      </Box>
    </Box>
  );
}
