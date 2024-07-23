import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Image,
  Spacer,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

export function Cart() {
  const [cart, setCart] = useState(null);
  const [product, setProduct] = useState([]);
  const toast = useToast();

  useEffect(() => {
    axios.get("/api/carts").then((res) => {
      setCart(res.data);
      setProduct(res.data.cartProduct);
      console.log(res.data);
    });
  }, []);

  if (cart === null) {
    return <Spinner />;
  }

  function handleRemoveProduct(productId) {
    axios
      .delete(`/api/carts/${productId}`)
      .then(() =>
        toast({
          description: "삭제되었습니다",
          duration: 1000,
          status: "success",
        }),
      )
      .catch(() =>
        toast({
          description: "삭제 실패했습니다",
          duration: 1000,
          status: "error",
        }),
      );
  }

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
        <Box>
          {cart.cartProduct.map((product, index) => (
            <Flex key={index}>
              <Image
                w="50px"
                h={"50px"}
                src={
                  "https://huistudybucket01.s3.ap-northeast-2.amazonaws.com/" +
                  product.filePath
                }
              />
              <Box>
                <Box>{product.productName}</Box>
                {product.optionList.map((item, index) => (
                  <Box key={index}>{item}</Box>
                ))}
                <Flex alignItems="center" mt={2}>
                  <Button>-</Button>
                  <Box mx={4} textAlign="center">
                    {product.count}개
                  </Box>
                  <Button>+</Button>
                </Flex>
              </Box>
              <Box>
                <Button
                  onClick={() =>
                    handleRemoveProduct(cart.cartProduct[index].productId)
                  }
                >
                  X
                </Button>
                <Box>{product.totalPrice.toLocaleString("ko-KR")}원</Box>
              </Box>
            </Flex>
          ))}
        </Box>
      </Box>
      <Flex>
        <Box>상품금액</Box>
        <Spacer />
      </Flex>
    </Box>
  );
}
