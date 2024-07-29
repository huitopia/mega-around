import {Box, Button, Center, Divider, Flex, Image, Spacer, Spinner, Text} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { LoginContext } from "../../component/LoginProvider.jsx";
import { CustomToast } from "../../component/CustomToast.jsx";
import { useNavigate } from "react-router-dom";
import { OrderContext } from "../../order/component/OrderProvider.jsx";
import {RoundGrayButtonStyle, RoundBlackButtonStyle} from "../../component/css/style.js";

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

  if (cart === null || cart.cartProduct.length === 0) {
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
      {cart.cartProduct.map((product, index) => (
        <Box  key={index} ml={3} mb={7} mr={6}>
        <Flex>
          <Image
            w="120px"
            h={"120px"}
            src={
              "https://huistudybucket01.s3.ap-northeast-2.amazonaws.com/" +
              product.filePath
            }
          />
          <Box ml={4} mt={5}>
            <Box fontWeight={"bold"}>{product.productName}</Box>
            {product.optionList.map((item, index) => (
              <Text fontSize={"sm"} key={index}>{item}</Text>
            ))}
            <Flex alignItems="center" mt={7}>
              <Button onClick={() => handleReduceCount(index)} {...RoundBlackButtonStyle}>-</Button>
              <Box mx={4} textAlign="center" fontSize={"lg"}>
                {product.count}
              </Box>
              <Button onClick={() => handlePlusCount(index)} {...RoundBlackButtonStyle}>+</Button>
            </Flex>
          </Box>
          <Spacer/>
          <Box>
            <Button
              onClick={() =>
                handleRemoveProduct(cart.cartProduct[index].productId)
              }
              {...RoundGrayButtonStyle}
              mt={5}
            >
              X
            </Button>
            <Box fontSize={"xl"} fontWeight={"bold"} mt={10}>
              {(product.totalPrice * product.count).toLocaleString("ko-KR")}원
            </Box>
          </Box>
        </Flex>
      {cart.cartProduct.length - 1 > index && (
        <Divider border={"1px solid gray.200"} my={4} ml={3} mr={6} mb={6}/>
  )}
  </Box>
      ))}
      <Flex mt={12}>
        <Box>상품금액</Box>
        <Spacer />
        <Box fontSize={"lg"} color={"red"} fontWeight={"bold"}>
          {calculateTotalPrice(cart.cartProduct).toLocaleString("ko-KR")}원
        </Box>
      </Flex>
      {cart && (
        <Center mt={10}>
        <Button
          colorScheme={"orange"}
          w={"700px"}
          onClick={() =>
            axios
              .put("/api/carts", cart)
              .then(() => navigate("/order?type=cart"))
              .catch(() =>
                errorToast("주문하기 실패했습니다. 다시 시도해주십시오."),
              )
          }
        >
          주문하기
        </Button>
        </Center>
      )}
    </Box>
  );
}
