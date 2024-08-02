import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  Image,
  Spacer,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { LoginContext } from "../../component/LoginProvider.jsx";
import { CustomToast } from "../../component/CustomToast.jsx";
import { useNavigate } from "react-router-dom";
import { OrderContext } from "../../order/component/OrderProvider.jsx";
import {
  RoundBlackButtonStyle,
  RoundGrayButtonStyle,
} from "../../component/css/style.js";

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
    });
  }, [userId, isChanged]);

  if (cart === "" || cart === null) {
    return <Box>장바구니에 상품이 없어요</Box>;
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
        <Box
          border={"1px solid blue"}
          maxWidth={"1200px"}
          mx={"auto"}
          mt={"50px"}
        >
          <Box textAlign={"center"}>
            <Heading size={"lg"}>PRODUCT LIST</Heading>
          </Box>
          <Box border={"1px solid black"} mt={"20px"}>
            <Flex>
              <Box width={"60%"}>
                {cart.cartProduct.map((product, index) => (
                  <Box key={index} ml={"10%"} border={"1px solid red"}>
                    <Flex>
                      <Image
                        w="150px"
                        h={"150px"}
                        src={
                          "https://huistudybucket01.s3.ap-northeast-2.amazonaws.com/" +
                          product.filePath
                        }
                      />
                      <Box ml={4} mt={5}>
                        <Box fontWeight={"bold"} fontSize={"23px"} mb={2}>
                          {product.productName}
                        </Box>
                        {product.optionList.map((item, index) => (
                          <Text fontSize={"sm"} key={index} mt={1}>
                            {item}
                          </Text>
                        ))}
                        <Flex alignItems="center" mt={7} mr={12} gap={8}>
                          <Button
                            onClick={() => handleReduceCount(index)}
                            {...RoundBlackButtonStyle}
                          >
                            -
                          </Button>
                          <Box mx={4} textAlign="center" fontSize={"lg"}>
                            {product.count}
                          </Box>
                          <Button
                            onClick={() => handlePlusCount(index)}
                            {...RoundBlackButtonStyle}
                          >
                            +
                          </Button>
                        </Flex>
                      </Box>

                      <Spacer />
                      <Spacer />

                      <Box>
                        <Flex justify={"right"}>
                          <Button
                            onClick={() =>
                              handleRemoveProduct(
                                cart.cartProduct[index].productId,
                              )
                            }
                            {...RoundGrayButtonStyle}
                            mt={5}
                          >
                            X
                          </Button>
                        </Flex>
                        <Box fontSize={"35px"} fontWeight={"bold"} mt={10}>
                          {(product.totalPrice * product.count).toLocaleString(
                            "ko-KR",
                          )}
                          원
                        </Box>
                      </Box>
                    </Flex>
                    {cart.cartProduct.length - 1 > index && (
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
              </Box>
              <Box width={"30%"} ml={"5%"} border={"1px solid yellow"}>
                <Flex mt={"60px"} align={"center"}>
                  <Box fontSize={"20px"}>상품금액</Box>
                  <Spacer />
                  <Box fontSize={"25px"} color={"red"} fontWeight={"bold"}>
                    {calculateTotalPrice(cart.cartProduct).toLocaleString(
                      "ko-KR",
                    )}
                    원
                  </Box>
                </Flex>
                {cart && (
                  <Center mt={"100px"} mb={"100px"}>
                    <Button
                      colorScheme={"orange"}
                      w={"650px"}
                      h={"60px"}
                      fontSize={"19px"}
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
                  </Center>
                )}
              </Box>
            </Flex>
          </Box>
          <Box bg={"#f8f9fa"} h={"30px"} w={"100%"} />
          {/* 옆으로*/}
        </Box>
      </Box>
    </Box>
  );
}
