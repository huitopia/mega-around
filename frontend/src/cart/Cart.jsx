import { Box, Button, Divider, Heading } from "@chakra-ui/react";
import { CartProductComp } from "./component/CartProductComp.jsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function Cart() {
  const navigate = useNavigate();
  const [isEmptyCart, setIsEmptyCart] = useState(false);

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
        <CartProductComp setIsEmptyCart={setIsEmptyCart} />
      </Box>
      {isEmptyCart || (
        <Button onClick={() => navigate("/order?type=cart")}>주문하기</Button>
      )}
    </Box>
  );
}
