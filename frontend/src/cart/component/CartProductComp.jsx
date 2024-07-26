import { Box, Button, Flex, Image, Spacer, Spinner } from "@chakra-ui/react";
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
              {(product.totalPrice * product.count).toLocaleString("ko-KR")}원
            </Box>
          </Box>
        </Flex>
      ))}
      <Flex>
        <Box>상품금액</Box>
        <Spacer />
        <Box>
          {calculateTotalPrice(cart.cartProduct).toLocaleString("ko-KR")}원
        </Box>
      </Flex>
      {cart && (
        <Button
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
      )}
    </Box>
  );
}
