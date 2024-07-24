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
        <Box bg={"black"} color={"white"}>
          이대역사거리점
        </Box>
        <Box>주문 상품</Box>
        <CartProductComp />
      </Box>
    </Box>
  );
}
