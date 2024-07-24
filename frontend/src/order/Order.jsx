import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Spacer,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { checkBoxStyle } from "../component/css/style.js";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { OrderContext } from "./component/OrderProvider.jsx";

export function Order() {
  const [provider, setProvider] = useState("html5_inicis");
  const [request, setRequest] = useState("");
  const [isTakeOut, setIsTakeOut] = useState("1");
  const [option, setOption] = useState([false, false]);
  const [orderItem, setOrderItem] = useState({});
  const [searchParams] = useSearchParams();
  const prevOrder = useContext(OrderContext);

  useEffect(() => {
    const iamport = document.createElement("script");
    iamport.src = "https://cdn.iamport.kr/v1/iamport.js";
    document.head.appendChild(iamport);
    return () => {
      document.head.removeChild(iamport);
    };
  }, []);

  useEffect(() => {
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
        name: "주문명:결제테스트", // 상품명
        amount: 1000, //상품 가격
        buyer_email: "iamport@siot.do", //고객 이메일,
        buyer_nickName: "구매자이름", // 고객 닉네임
        buyer_tel: "010-1234-5678" /*구매자 연락처*/,
      },
      function (rsp) {
        const merchantUid = rsp.merchant_uid;
        if (rsp.success) {
          axios
            .post("/api/payments", {
              // orderItem.id,
              // orderItem.totalPrice,
              provider,
              merchantUid,
            })
            .then()
            .catch();
        }
      },
    );
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
              <Box as="span" flex="1" textAlign="left">
                주문 상품
              </Box>
              <Box>{orderItem.orderProduct.productName}</Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Box>수박주스</Box>
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
          <Radio size="md" value={"naverpay"}>
            네이버페이
          </Radio>
          <Radio size="md" value={"tosspay"}>
            토스페이
          </Radio>
        </RadioGroup>

        <Box>
          <Box>쿠폰 적용</Box>
          <Flex>
            <Box>쿠폰</Box>
            <Spacer />
            <ChevronRightIcon />
          </Flex>
        </Box>
        <Button onClick={handlePayment}>결제하기</Button>
      </Box>
    </Box>
  );
}
