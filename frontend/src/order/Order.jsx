import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Card,
  Center,
  Checkbox,
  CheckboxGroup,
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
import {
  checkBoxStyle,
  RoundBlackButtonStyle,
} from "../component/css/style.js";
import axios from "axios";
import {
  useNavigate,
  useOutletContext,
  useSearchParams,
} from "react-router-dom";
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
      <Box mt={"50px"} mb={"50px"}>
        <Center>
          <Heading>Order</Heading>
        </Center>
      </Box>
      <Flex
        bg={"black"}
        color={"white"}
        h={"50px"}
        align={"center"}
        justify={"center"}
      >
        이대역사거리점
      </Flex>
      <Spacer />
      <Accordion allowMultiple mt={5}>
        <AccordionItem>
          <h2>
            <AccordionButton h={"50px"}>
              <Flex gap={10} alignItems={"center"} w={"100%"}>
                <Box fontWeight={"bold"} fontSize={"19px"} ml={3}>
                  주문 상품
                </Box>
                <Spacer />
                <Box mr={2}>{orderItem.orderProduct[0].productName}</Box>
              </Flex>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel>
            <Card variant={"outline"}>
              <Stack divider={<StackDivider />} spacing="4">
                {orderItem.orderProduct.map((product, index) => (
                  <Flex key={index} alignItems={"center"} p={3}>
                    <Box>
                      <Image
                        src={
                          "https://huistudybucket01.s3.ap-northeast-2.amazonaws.com/" +
                          product.filePath
                        }
                        w={"120px"}
                        h={"120px"}
                      />
                    </Box>
                    <Box ml={4}>
                      <Box fontSize={"18px"}>{product.productName}</Box>
                      {product.optionList.map((item, index) => (
                        <Box key={index} fontSize={"sm"}>
                          {item}
                        </Box>
                      ))}
                      <Box mt={3} fontSize={"21px"} mb={1}>
                        {product.count}개
                      </Box>
                    </Box>
                    <Spacer />
                    <Box fontWeight={"bold"} fontSize={"23px"} mt={9} pr={3}>
                      {(product.totalPrice * product.count).toLocaleString(
                        "ko-KR",
                      )}
                      원
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
          <FormLabel fontWeight={"bold"} mt={9} ml={4}>
            매장 요청사항
          </FormLabel>
          <Input
            ml={3}
            w={"99%"}
            border={"1px solid #5b5859"}
            placeholder={"매장 요청사항이 있으면 적어주세요."}
            fontSize={"13px"}
            onChange={(e) => setRequest(e.target.value)}
          />
        </FormControl>
        <RadioGroup
          onChange={setIsTakeOut}
          value={isTakeOut}
          mt={7}
          mb={7}
          ml={4}
        >
          <Box fontWeight={"bold"} mb={1}>
            포장 요청사항
          </Box>
          <Radio size="md" value={"1"} colorScheme="black" ml={2}>
            포장해주세요
          </Radio>
          <Radio size="md" value={"2"} colorScheme="black" ml={6}>
            매장에서 먹고 갈게요
          </Radio>
        </RadioGroup>
        {isTakeOut === "1" && (
          <CheckboxGroup>
            <Box ml={4} fontWeight={"bold"} mb={1}>
              포장옵션
            </Box>
            <Checkbox
              ml={6}
              size="md"
              {...checkBoxStyle}
              isChecked={option[0]}
              onChange={(e) => setOption([e.target.checked, option[1]])}
            >
              캐리어/봉투 필요해요
            </Checkbox>
            <Checkbox
              ml={6}
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
              <AccordionButton h={"50px"}>
                <Flex w={"100%"} alignItems={"center"}>
                  <Box ml={1} fontWeight={"bold"}>
                    쿠폰 적용
                  </Box>
                  <Spacer />
                  <Box fontSize={"sm"}>{couponCount}개 보유</Box>
                  <ChevronRightIcon w={"20px"} />
                </Flex>
              </AccordionButton>
              <AccordionPanel>
                <Flex mt={3} alignItems={"center"}>
                  <Box ml={4} mr={5}>
                    쿠폰
                  </Box>
                  <Button
                    onClick={reduceCouponCount}
                    {...RoundBlackButtonStyle}
                  >
                    -
                  </Button>
                  <Box mx={4} textAlign="center" fontSize={"lg"}>
                    {useCouponCount}
                  </Box>
                  <Button {...RoundBlackButtonStyle} onClick={plusCouponCount}>
                    +
                  </Button>
                  <Box ml={3}>개 사용</Box>
                </Flex>
              </AccordionPanel>
            </h2>
          </AccordionItem>
        </Accordion>
        <RadioGroup onChange={setProvider} value={provider} mt={7}>
          <Box fontWeight={"bold"} ml={5} mb={2}>
            결제 수단
          </Box>
          <Radio size="md" value="html5_inicis" defaultChecked ml={5}>
            신용카드
          </Radio>
          <Radio ml={3} size="md" value={"kakaopay"}>
            카카오페이
          </Radio>
          <Radio ml={3} size="md" value={"payco"}>
            페이코
          </Radio>
          <Radio ml={3} size="md" value={"uplus"}>
            토스페이
          </Radio>
        </RadioGroup>
        <Box ml={6} fontSize={"18px"}>
          <Flex mt={"40px"} align={"center"}>
            <Box>상품금액</Box>
            <Spacer />
            <Box fontSize={"23px"} fontWeight={"bold"}>
              {calculateTotalPrice(orderItem.orderProduct).toLocaleString(
                "ko-KR",
              )}
              원
            </Box>
          </Flex>
          <Flex align={"center"}>
            <Box>할인금액</Box>
            <Spacer />
            <Box fontSize={"23px"} fontWeight={"bold"}>
              -{useCouponCount * 2000}원
            </Box>
          </Flex>
          <Flex mt={1}>
            <Box>결제금액</Box>
            <Spacer />
            <Box fontSize={"25px"} color={"red"} fontWeight={"bold"}>
              {(
                calculateTotalPrice(orderItem.orderProduct) -
                useCouponCount * 2000
              ).toLocaleString("ko-KR")}
              원
            </Box>
          </Flex>
        </Box>
        <Center ml={3}>
          <Button
            onClick={handlePayment}
            colorScheme={"orange"}
            w={"650px"}
            h={"60px"}
            fontSize={"19px"}
            mt={"50px"}
          >
            결제하기
          </Button>
        </Center>
      </Box>
    </Box>
  );
}
