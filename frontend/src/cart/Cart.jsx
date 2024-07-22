import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Image,
  Spacer,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

export function Cart() {
  const [cart, setCart] = useState(null);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios.get("/api/carts").then((res) => {
      setCart(res.data);
      setProduct(res.data.cartProduct);
      console.log(res.data);
    });
  }, []);

  const decreaseCount = (id) => {
    setProduct((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, count: Math.max(item.count - 1, 0) } : item,
      ),
    );
    console.log(product);
  };

  const increaseCount = (id) => {
    setProduct((prevProduct) =>
      prevProduct.map((item) =>
        item.id === id ? { ...item, count: item.count + 1 } : item,
      ),
    );
  };

  if (cart === null) {
    return <Spinner />;
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
                  <Button onClick={() => decreaseCount(product.id)}>-</Button>
                  <Box mx={4} textAlign="center">
                    {product.count}개
                  </Box>
                  <Button onClick={() => increaseCount(product.id)}>+</Button>
                </Flex>
              </Box>
              <Box>
                <Button>X</Button>
                <Box>{product.totalPrice.toLocaleString("ko-KR")}원</Box>
              </Box>
            </Flex>
          ))}
        </Box>
      </Box>
      <Flex>
        <Box>상품금액</Box>
        <Spacer />
        {/*{cartProduct.map((item, index) => (*/}
        {/*  <Box key={index}>{item.totalPrice * countList[index]}</Box>*/}
        {/*))}*/}
      </Flex>
    </Box>
  );
}
