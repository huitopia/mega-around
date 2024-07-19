import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Radio,
  Spacer,
  Stack,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import axios from "axios";

export function Order() {
  useEffect(() => {
    const iamport = document.createElement("script");
    iamport.src = "https://cdn.iamport.kr/v1/iamport.js";
    document.head.appendChild(iamport);
    return () => {
      document.head.removeChild(iamport);
    };
  }, []);

  function handlePayment() {
    const { IMP } = window;
    IMP.init("imp07804317");
    //결제시 전달되는 정보
    IMP.request_pay(
      {
        pg: "html5_inicis",
        pay_method: "card",
        merchant_uid: "merchant_" + new Date().getTime(),
        name: "주문명:결제테스트", // 상품명
        amount: 1000, //상품 가격
        buyer_email: "iamport@siot.do", //고객 이메일,
        buyer_nickName: "구매자이름", // 고객 닉네임
        buyer_tel: "010-1234-5678" /*구매자 연락처*/,
      },
      function (rsp) {
        if (rsp.success) {
          axios.post("/api/payments").then().catch();
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
              <Box>수박 주스</Box>
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
          <Input placeholder={"매장 요청사항이 있으면 적어주세요."} />
        </FormControl>
        <Stack>
          <Box>포장 요청사항</Box>
          <Radio size="md" name="1" colorScheme="red">
            포장해주세요
          </Radio>
          <Radio size="md" name="1" colorScheme="green">
            매장에서 먹고 갈게요
          </Radio>
        </Stack>
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
