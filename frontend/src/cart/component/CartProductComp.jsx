import { Box, Button, Flex, Image, Spacer, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

export function CartProductComp({ setIsEmptyCart }) {
  const [isChanged, setIsChanged] = useState(false);
  const [cart, setCart] = useState(null);
  const [updateCart, setUpdateCart] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [updateTotalPrice, setUpdateTotalPrice] = useState(0);
  const toast = useToast();

  useEffect(() => {
    axios.get("/api/carts").then((res) => {
      setCart(res.data);
      setIsChanged(false);
      setTotalPrice(calculateTotalPrice(res.data.cartProduct));
    });
  }, [isChanged]);

  if (cart === null) {
    setIsEmptyCart(true);
    return <Box>장바구니에 상품이 없어요</Box>;
  }

  function handleRemoveProduct(productId) {
    axios
      .delete(`/api/carts/${productId}`)
      .then(() => {
        toast({
          description: "삭제되었습니다",
          duration: 1000,
          status: "success",
        });
        setIsChanged(true);
      })
      .catch(() =>
        toast({
          description: "삭제 실패했습니다",
          duration: 1000,
          status: "error",
        }),
      )
      .finally();
  }

  function calculateTotalPrice(cartProduct) {
    return cartProduct.reduce((prev, cur) => {
      return (prev += cur.totalPrice);
    }, 0);
  }

  function handleReduceCount(index) {
    let newCart = {};
    let newCartProduct = {};
    const count =
      cart.cartProduct[index].count - 1 > 1
        ? cart.cartProduct[index].count - 1
        : 1;
    const perPrice =
      count === 1
        ? cart.cartProduct[index].totalPrice
        : cart.cartProduct[index].totalPrice / (count + 1);
    if (updateCart === null) {
      newCart = { ...cart };
      const newCartProduct = {
        ...cart.cartProduct[index],
        count: count,
        // TODO. count - 1 로 곱해지는 문제
        totalPrice: perPrice * count,
      };
      newCart.cartProduct[index] = newCartProduct;
      if (count > 1) {
        setUpdateTotalPrice(totalPrice - perPrice);
      }
      console.log(updateTotalPrice);
    } else {
      newCart = { ...updateCart };
      const updateCount =
        updateCart.cartProduct[index].count - 1 > 1
          ? updateCart.cartProduct[index].count - 1
          : 1;
      newCartProduct = {
        ...updateCart.cartProduct[index],
        count: updateCount,
        totalPrice: perPrice * updateCount,
      };
      newCart.cartProduct[index] = newCartProduct;
      if (updateCount - 1 > 1) {
        setUpdateTotalPrice(updateTotalPrice - perPrice);
      }
      console.log("함수 안 " + updateTotalPrice);
    }
    setUpdateCart(newCart);
    setIsChanged(true);
  }

  function handlePlusCount(index) {
    let newCart = {};
    let newCartProduct = {};
    const count = cart.cartProduct[index].count;
    const perPrice = cart.cartProduct[index].totalPrice / count;
    if (updateCart === null) {
      newCart = { ...cart };
      const newCartProduct = {
        ...cart.cartProduct[index],
        count: count + 1,
        totalPrice: perPrice * (count + 1),
      };
      newCart.cartProduct[index] = newCartProduct;
    } else {
      newCart = { ...updateCart };
      const updateCount = updateCart.cartProduct[index].count + 1;
      newCartProduct = {
        ...updateCart.cartProduct[index],
        count: updateCount,
        totalPrice: perPrice * updateCount,
      };
      newCart.cartProduct[index] = newCartProduct;
    }
    setUpdateCart(newCart);
    setIsChanged(true);
  }

  return (
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
              <Button onClick={() => handleReduceCount(index)}>-</Button>
              <Box mx={4} textAlign="center">
                {product.count}
                {/*{updateCart === null || updateCart.cartProduct[index].count}*/}
                {/*{updateCart === null && product.count}개*/}
              </Box>
              <Button onClick={() => handlePlusCount(index)}>+</Button>
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
            <Box>
              {updateCart === null ||
                updateCart.cartProduct[index].totalPrice.toLocaleString(
                  "ko-KR",
                )}
              {updateCart === null &&
                product.totalPrice.toLocaleString("ko-KR")}
              원
            </Box>
          </Box>
        </Flex>
      ))}
      <Flex>
        <Box>상품금액</Box>
        <Spacer />
        <Box>
          {updateTotalPrice === 0 && totalPrice.toLocaleString("ko-KR")}
          {updateTotalPrice !== 0 && updateTotalPrice.toLocaleString("ko-KR")}원
        </Box>
      </Flex>
    </Box>
  );
}
