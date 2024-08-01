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
import {useNavigate, useOutletContext, useSearchParams} from "react-router-dom";
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
  const [useCouponCount, setUseCouponCount] = useState(0);
  const [searchParams] = useSearchParams();
  const directOrder = useContext(OrderContext);
  const account = useContext(LoginContext);
  const navigate = useNavigate();
  const { errorToast } = CustomToast();
  const { setUpdateAlarm } = useOutletContext();

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
    if (searchParams.get("type") === "cart") {
      axios.get(`/api/carts`).then((res) => {
        const data = res.data;
        const updatedData = {
          ...data,
          orderProduct: data.cartProduct,
        };
        delete updatedData.cartProduct;
        setOrderItem(updatedData);
        console.log(res.data);
      });
    } else if (searchParams.get("type") === "order") {
      setOrderItem(directOrder.item);
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
        amount:
          calculateTotalPrice(orderItem.orderProduct) - 2000 * useCouponCount, //상품 가격
        buyer_email: account.email, //고객 이메일,
        buyer_nickName: account.nickName, // 고객 닉네임
        buyer_tel: "010-1234-5678" /*구매자 연락처*/,
      },
      function (rsp) {
        const merchantUid = rsp.merchant_uid;
        if (rsp.success) {
          axios
            .post("/api/payments", {
              orderItem: {
                ...orderItem,
                customerId: account.id,
                branchId: orderItem.branchId,
                totalPrice: calculateTotalPrice(orderItem.orderProduct),
                request,
                isTakeOut,
                option,
                couponCount: useCouponCount,
              },
              payment: {
                totalPrice: calculateTotalPrice(orderItem.orderProduct),
                provider,
                merchantUid,
                couponCount: useCouponCount,
              },
            })
            .then((res) => {
              navigate(`/order/${res.data}`);
              setUpdateAlarm(true);
            })
            .catch(() => errorToast("결제 실패했습니다"));
        }
      },
    );
  }

  function calculateTotalPrice(orderProduct) {
    return orderProduct.reduce((prev, cur) => {
      return (prev += cur.totalPrice * cur.count);
    }, 0);
  }

  if (orderItem === null) {
    return <Box>장바구니에 상품이 없어요</Box>;
  }

  function reduceCouponCount() {
    const newCouponCount = useCouponCount > 0 ? useCouponCount - 1 : 0;
    setUseCouponCount(newCouponCount);
  }

  function plusCouponCount() {
    const newCouponCount =
      useCouponCount < couponCount &&
      calculateTotalPrice(orderItem.orderProduct) > (useCouponCount + 1) * 2000
        ? useCouponCount + 1
        : useCouponCount;
    setUseCouponCount(newCouponCount);
  }

  return (
    <Box maxWidth="1000px" mx={"auto"}>
      <Box>
        <Heading>Order</Heading>
      </Box>
      <Divider border={"1px solid black"} my={4} />
      <Box bg={"black"} color={"white"} h={"40px"}>
        이대역사거리점
      </Box>
      <Spacer />
      <Accordion allowMultiple>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Flex gap={10}>
                <Box fontWeight={"bold"} fontSize={"xl"}>주문 상품</Box>
                <Box as={"sub"}>{orderItem.orderProduct[0].productName}</Box>
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
      <Box ml={3}>
        <FormControl>
          <FormLabel fontWeight={"bold"} color={"#777475"} mt={3}>매장 요청사항</FormLabel>
          <Input
            border={"1px solid #5b5859"}
            placeholder={"매장 요청사항이 있으면 적어주세요."}
            onChange={(e) => setRequest(e.target.value)}
          />
        </FormControl>
        <RadioGroup onChange={setIsTakeOut} value={isTakeOut} mt={7} mb={7}>
          <Box>포장 요청사항</Box>
          <Radio size="md" value={"1"}  colorScheme='black'>
            포장해주세요
          </Radio>
          <Radio size="md" value={"2"}  colorScheme='black'>
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
        <Accordion allowMultiple mt={7}>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box>
                  <Box>쿠폰 적용</Box>
                  <Flex>
                    <Spacer />
                    <Box>{couponCount}개 보유</Box>
                    <ChevronRightIcon />
                  </Flex>
                </Box>
              </AccordionButton>
              <AccordionPanel>
                <Box>쿠폰</Box>
                <Flex>
                  <Button onClick={reduceCouponCount}>-</Button>
                  <Box>{useCouponCount}</Box>
                  <Button onClick={plusCouponCount}>+</Button>
                  <Box>개 사용</Box>
                </Flex>
              </AccordionPanel>
            </h2>
          </AccordionItem>
        </Accordion>
        <RadioGroup onChange={setProvider} value={provider} mt={7}>
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
          <Flex>
            <Box>상품금액</Box>
            <Spacer />
            <Box>
              {calculateTotalPrice(orderItem.orderProduct).toLocaleString(
                "ko-KR",
              )}
              원
            </Box>
          </Flex>
          <Flex>
            <Box>할인금액</Box>
            <Spacer />
            <Box>-{useCouponCount * 2000}원</Box>
          </Flex>
          <Flex>
            <Box>결제금액</Box>
            <Spacer />
            <Box>
              {(
                calculateTotalPrice(orderItem.orderProduct) -
                useCouponCount * 2000
              ).toLocaleString("ko-KR")}
              원
            </Box>
          </Flex>
        </Box>
        <Button onClick={handlePayment} colorScheme={"orange"}>결제하기</Button>
      </Box>
    </Box>
  );
}
