import { Box, Divider, Heading } from "@chakra-ui/react";
import { CartProductComp } from "./component/CartProductComp.jsx";

export function Cart() {
  return (
    <Box maxWidth="1000px" mx={"auto"}>
      <Box>
        <Heading>Cart</Heading>
      </Box>
      <Divider border={"1px solid black"} my={4} />
      <Box>
        <Box bg={"black"} color={"white"} h={"40px"}>
          이대역사거리점
        </Box>
        <Box fontWeight={"bold"} mt={5} fontSize={"1.2rem"} mb={5}>주문 상품</Box>
        <CartProductComp />
      </Box>
    </Box>
  );
}
