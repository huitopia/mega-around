import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Card,
  Checkbox,
  CheckboxGroup,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Radio,
  RadioGroup,
  Spacer,
  Stack,
  StackDivider,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { checkBoxStyle } from "../component/css/style.js";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { OrderContext } from "./component/OrderProvider.jsx";
import { LoginContext } from "../component/LoginProvider.jsx";
import { CustomToast } from "../component/CustomToast.jsx";

export function Order() {
  const [provider, setProvider] = useState("html5_inicis");
  const [request, setRequest] = useState("");
  const [isTakeOut, setIsTakeOut] = useState("1");
  const [option, setOption] = useState([false, false]);
  const [orderItem, setOrderItem] = useState(null);
  const [couponCount, setCouponCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState();
  const [searchParams] = useSearchParams();
  const prevOrder = useContext(OrderContext);
  const account = useContext(LoginContext);
  const navigate = useNavigate();
  const { errorToast } = CustomToast();

  useEffect(() => {
    const iamport = document.createElement("script");
    iamport.src = "https://cdn.iamport.kr/v1/iamport.js";
    document.head.appendChild(iamport);
    return () => {
      document.head.removeChild(iamport);
    };
  }, []);

  useEffect(() => {
    axios.get("/api/event/coupon").then((res) => {
      setCouponCount(res.data);
      console.log(res.data);
    });
    console.log(searchParams);
    if (searchParams.get("type") === "cart") {
      axios.get(`/api/carts`).then((res) => {
        const data = res.data;
        const updatedData = {
          ...data,
          orderProduct: data.cartProduct,
        };
        delete updatedData.cartProduct;
        setOrderItem(updatedData);
        setTotalPrice(calculateTotalPrice(res.data.cartProduct));
        console.log(res.data);
      });
    } else if (searchParams.get("type") === "order") {
      setOrderItem({
        branchId: prevOrder.branchId,
        branchName: prevOrder.branchName,
        totalPrice: prevOrder.totalPrice,
        orderProduct: [
          {
            productId: prevOrder.productId,
            productName: prevOrder.productName,
            count: prevOrder.count,
            totalPrice: prevOrder.totalPrice,
            option: prevOrder.option,
          },
        ],
      });
    }
  }, []);

  useEffect(() => {
    console.log(provider);
  }, [provider]);

  function handlePayment() {
    const { IMP } = window;
    IMP.init("imp07804317");
    //결제시 전달되는 정보
    IMP.request_pay(
      {
        pg: provider,
        pay_method: "card",
        merchant_uid: "merchant_" + new Date().getTime(),
        name: "메가어라운드 " + orderItem.orderProduct.productName, // 상품명
        amount: 1000, //상품 가격
        buyer_email: account.email, //고객 이메일,
        buyer_nickName: account.nickName, // 고객 닉네임
        buyer_tel: "010-1234-5678" /*구매자 연락처*/,
      },
      function (rsp) {
        const merchantUid = rsp.merchant_uid;
        console.log(rsp);
        console.log("----orderItem");
        console.log(orderItem);
        if (rsp.success) {
          console.log("실행이 외않되");
          axios
            .post("/api/payments", {
              orderItem: {
                ...orderItem,
                customerId: account.id,
                branchId: orderItem.branchId,
                totalPrice,
                request,
                isTakeOut,
                option,
              },
              payment: {
                totalPrice,
                provider,
                merchantUid,
                couponCount: 0,
              },
            })
            .then((res) => navigate(`/order/${res.data}`))
            .catch(() => errorToast("결제 실패했습니다"));
        }
      },
    );
  }

  function calculateTotalPrice(cartProduct) {
    return cartProduct.reduce((prev, cur) => {
      return (prev += cur.totalPrice);
    }, 0);
  }

  if (orderItem === null) {
    return <Box>장바구니에 상품이 없어요</Box>;
  }

  return (
    <Box maxWidth="1000px" mx={"auto"}>
      <Box>
        <Heading>Order</Heading>
      </Box>
      <Divider border={"1px solid black"} my={4} />
      <Box bg={"black"} color={"white"}>
        이대역사거리점
      </Box>
      <Spacer />
      <Accordion defaultIndex={[0]} allowMultiple>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Flex gap={10}>
                <Box>주문 상품</Box>
                <Box>{orderItem.orderProduct[0].productName}</Box>
              </Flex>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Card>
              <Stack divider={<StackDivider />} spacing="4">
                {orderItem.orderProduct.map((product, index) => (
                  <Flex key={index}>
                    <Box>
                      <Image
                        src={
                          "https://huistudybucket01.s3.ap-northeast-2.amazonaws.com/" +
                          product.filePath
                        }
                        w={"50px"}
                        h={"50px"}
                      />
                    </Box>
                    <Box>
                      <Box>{product.productName}</Box>
                      {product.optionList.map((item, index) => (
                        <Box key={index}>{item}</Box>
                      ))}
                      <Box>{product.count}개</Box>
                    </Box>
                    <Box>
                      <Box fontWeight={"bold"}>
                        {(product.totalPrice * product.count).toLocaleString(
                          "ko-KR",
                        )}
                        원
                      </Box>
                    </Box>
                  </Flex>
                ))}
              </Stack>
            </Card>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <Box>
        <FormControl>
          <FormLabel>매장 요청사항</FormLabel>
          <Input
            placeholder={"매장 요청사항이 있으면 적어주세요."}
            onChange={(e) => setRequest(e.target.value)}
          />
        </FormControl>
        <RadioGroup onChange={setIsTakeOut} value={isTakeOut}>
          <Box>포장 요청사항</Box>
          <Radio size="md" value={"1"}>
            포장해주세요
          </Radio>
          <Radio size="md" value={"2"}>
            매장에서 먹고 갈게요
          </Radio>
        </RadioGroup>
        {isTakeOut === "1" && (
          <CheckboxGroup>
            <Box>포장옵션</Box>
            <Checkbox
              size="md"
              {...checkBoxStyle}
              isChecked={option[0]}
              onChange={(e) => setOption([e.target.checked, option[1]])}
            >
              캐리어/봉투 필요해요
            </Checkbox>
            <Checkbox
              size="md"
              {...checkBoxStyle}
              isChecked={option[1]}
              onChange={(e) => setOption([option[0], e.target.checked])}
            >
              빨대/스틱 필요해요
            </Checkbox>
          </CheckboxGroup>
        )}
        <RadioGroup onChange={setProvider} value={provider}>
          <Box>결제 수단</Box>
          <Radio size="md" value="html5_inicis" defaultChecked>
            신용카드
          </Radio>
          <Radio size="md" value={"kakaopay"}>
            카카오페이
          </Radio>
          <Radio size="md" value={"payco"}>
            페이코
          </Radio>
          <Radio size="md" value={"uplus"}>
            토스페이
          </Radio>
        </RadioGroup>
        <Box>
          <Box>쿠폰 적용</Box>
          <Flex>
            <Box>쿠폰</Box>
            <Spacer />
            <Box>{couponCount}장 보유</Box>
            <ChevronRightIcon />
          </Flex>
        </Box>
        <Button onClick={handlePayment}>결제하기</Button>
      </Box>
    </Box>
  );
}
