import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Grid,
  Heading,
  HStack,
  Image,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { LoginContext } from "../../component/LoginProvider.jsx";
import { CustomToast } from "../../component/CustomToast.jsx";
import { useNavigate } from "react-router-dom";
import { OrderContext } from "../../order/component/OrderProvider.jsx";

export function CartProductComp(props) {
  const account = useContext(LoginContext);
  const userId = account;
  const [isChanged, setIsChanged] = useState(false);
  const [cart, setCart] = useState(null);
  const { successToast, errorToast } = CustomToast();
  const navigate = useNavigate();
  const item = useContext(OrderContext);

  useEffect(() => {
    axios.get("/api/carts").then((res) => {
      setCart(res.data);
      setIsChanged(false);
      console.log(res.data);
    });
  }, [userId, isChanged]);

  if (cart === "" || cart === null) {
    return (
      <Box>
        <Box
          height={"280px"}
          backgroundColor={"#444444"}
          textAlign={"center"}
          display={"flex"}
          alignItems={"center"}
          justifyContent="center"
        >
          <Box>
            <Heading size="2xl" textColor={"#FDD000"}>
              CART LIST
            </Heading>
          </Box>
        </Box>
        <Box mt={"30px"}>
          <Center>
            <Heading size={"md"}>빈 바구니</Heading>
          </Center>
        </Box>
      </Box>
    );
  }

  function handleRemoveProduct(productId) {
    axios
      .delete(`/api/carts/${productId}`)
      .then(() => {
        successToast("삭제되었습니다");
        setIsChanged(true);
      })
      .catch(() => errorToast("삭제 실패했습니다"));
  }

  function calculateTotalPrice(cartProduct) {
    return cartProduct.reduce((prev, cur) => {
      return (prev += cur.totalPrice * cur.count);
    }, 0);
  }

  function handleReduceCount(index) {
    const count = cart.cartProduct[index].count;
    const minusCount = count > 1 ? count - 1 : count;
    const newCart = {
      ...cart,
    };
    newCart.cartProduct[index] = {
      ...cart.cartProduct[index],
      count: minusCount,
    };
    setCart(newCart);
  }

  function handlePlusCount(index) {
    const count = cart.cartProduct[index].count;
    const newCart = {
      ...cart,
    };
    newCart.cartProduct[index] = {
      ...cart.cartProduct[index],
      count: count + 1,
    };
    setCart(newCart);
  }

  if (cart === null) {
    return <Spinner />;
  }

  return (
    <Box>
      <Box
        height={"280px"}
        backgroundColor={"#444444"}
        textAlign={"center"}
        display={"flex"}
        alignItems={"center"}
        justifyContent="center"
      >
        <Box>
          <Heading size="2xl" textColor={"#FDD000"}>
            CART LIST
          </Heading>
          <Text fontSize={"lg"} textColor={"pink"}>
            {cart.branchName}
          </Text>
        </Box>
      </Box>
      <Box maxWidth={"1200px"} mx={"auto"} mt={"50px"}>
        <Box>
          <Center>
            <Heading size={"lg"}>장바구니 상품</Heading>
          </Center>
        </Box>
        <Box>
          <Box marginTop={"50px"}>
            <VStack>
              {cart.cartProduct.map((product) => (
                // 상품 박스
                <Box
                  borderBottom={"2px solid #444444"}
                  width={"70%"}
                  key={product.productId}
                  height={"180px"}
                  marginBottom={"20px"}
                >
                  <Flex>
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      height={"180px"}
                    >
                      <Image
                        width="170px"
                        src={
                          "https://huistudybucket01.s3.ap-northeast-2.amazonaws.com/" +
                          product.filePath
                        }
                      />
                    </Box>
                    <Box width={"80%"} paddingLeft={"10px"}>
                      <Box height={"40%"} paddingTop={"30px"}>
                        <Text fontWeight={"bold"} fontSize={"2xl"}>
                          {product.productName}
                        </Text>
                      </Box>
                      <Box height={"40%"} paddingLeft={"10px"}>
                        <Grid templateColumns="repeat(3, 1fr)">
                          {product.optionList.map((item, index) => (
                            <Text key={index} fontSize={"md"} marginTop={"5px"}>
                              {item}
                            </Text>
                          ))}
                        </Grid>
                      </Box>
                    </Box>
                    <Box width={"20%"}>
                      <VStack>
                        <Button
                          onClick={() =>
                            handleRemoveProduct(
                              cart.cartProduct[product.productId].productId,
                            )
                          }
                          paddingTop={"10px"}
                          paddingLeft={"60%"}
                          size={"lg"}
                          variant="link"
                          colorScheme={"gray"}
                        >
                          {/*{...RoundGrayButtonStyle}*/}X
                        </Button>
                        <Box paddingTop={"30px"}>
                          <Text fontWeight={"bold"} fontSize={"xl"}>
                            {(
                              product.totalPrice * product.count
                            ).toLocaleString("ko-KR")}
                            원
                          </Text>
                        </Box>
                        <HStack alignItems="center" paddingTop={"10px"}>
                          <Button
                            onClick={() => handleReduceCount(product.productId)}
                            size={"sm"}
                          >
                            -
                          </Button>
                          <Box mx={4} textAlign="center" fontSize={"lg"}>
                            {product.count}
                          </Box>
                          <Button
                            onClick={() => handlePlusCount(product.productId)}
                            size={"sm"}
                          >
                            {/*{...RoundBlackButtonStyle}*/}+
                          </Button>
                        </HStack>
                      </VStack>
                    </Box>
                  </Flex>
                  {cart.cartProduct.length - 1 > product.productId && (
                    <Divider
                      border={"1px solid gray.200"}
                      my={4}
                      ml={3}
                      mr={6}
                      mt={9}
                    />
                  )}
                </Box>
              ))}
            </VStack>
          </Box>
          <Box>
            <VStack>
              <Box width={"70%"} justifyContent={"right"} display={"flex"}>
                <HStack paddingTop={"50px"} gap={20}>
                  <Box fontSize={"20px"}>총 결제 금액</Box>
                  <Box fontSize={"25px"} color={"red"} fontWeight={"bold"}>
                    {calculateTotalPrice(cart.cartProduct).toLocaleString(
                      "ko-KR",
                    )}
                    원
                  </Box>
                </HStack>
              </Box>
            </VStack>
            {cart && (
              <VStack marginTop={"50px"}>
                <HStack gap={10}>
                  <Button width={"200px"} colorScheme={"pink"}>
                    쇼핑 계속하기
                  </Button>
                  <Button
                    width={"200px"}
                    colorScheme={"orange"}
                    onClick={() =>
                      axios
                        .put("/api/carts", cart)
                        .then(() => navigate("/order?type=cart"))
                        .catch(() =>
                          errorToast(
                            "주문하기 실패했습니다. 다시 시도해주십시오.",
                          ),
                        )
                    }
                  >
                    주문하기
                  </Button>
                </HStack>
              </VStack>
            )}
          </Box>
        </Box>
        {/* 옆으로*/}
      </Box>
    </Box>
  );
}
