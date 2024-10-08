import {
  Box,
  Card,
  Center,
  Flex,
  Heading,
  Image,
  Progress,
  Spacer,
  Spinner,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export function OrderDetail() {
  const [order, setOrder] = useState(null);
  const [progress, setProgress] = useState(1);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`/api/orders/${id}`).then((res) => {
      setOrder(res.data);
      setProgress(res.data.stateId);
      console.log(res.data);
    });
  }, [id]);

  const progressPercent = () => {
    const percent = ((progress - 1) / 2) * 100;
    return percent === 0 ? 4 : percent;
  };

  if (order === null) {
    return <Spinner />;
  }

  const totalCount = order.orderProduct.reduce(
    (sum, product) => sum + product.count,
    0,
  );

  function defineProvider(provider) {
    switch (provider) {
      case "html5_inicis":
        return "카드";
      case "kakaopay":
        return "카카오페이";
      case "payco":
        return "페이코";
      case "uplus":
        return "토스페이";
      default:
        return "알 수 없는 결제수단";
    }
  }

  function modifyTime(createdAtString) {
    const time = createdAtString.substring(14).split(":");
    return time[0] + "시 " + (parseInt(time[1]) + 5) + "분";
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
            Order Detail
          </Heading>
          <Text fontSize={"lg"} textColor={"pink"}>
            1시간 이내에 찾아가지 않으실 경우 품질 및 보관 문제로 폐기 될 수
            있습니다.
          </Text>
        </Box>
      </Box>
      <Box maxWidth="1000px" mx="auto">
        <Card variant={"outline"} mb={4} pl={3} pr={3} mt={10}>
          <Center mb={2} mt={7}>
            <Box textAlign="center">
              <Box fontSize={"20px"}>{order.branchName}</Box>
              <Box fontWeight={"bold"} fontSize={"22px"} mt={1}>
                주문번호: {order.id}
              </Box>
              <Box color={"#656565"} mt={2}>
                {order.createdAtString}
              </Box>
              <Box
                bg={"#f8f9fa"}
                h={"50px"}
                display="flex"
                alignItems="center"
                justifyContent="center"
                w={"400px"}
                mt={3}
              >
                <Text fontSize={"xl"} fontWeight={"bold"}>
                  {modifyTime(order.createdAtString)}
                </Text>
                <Text fontSize={"16px"}>까지 제조가 완료될 예정입니다.</Text>
              </Box>
            </Box>
          </Center>
          <Box mb={4} mt={4} p={7}>
            <Flex justifyContent="space-between">
              <Box color={progress == 1 ? "red" : "black"}>결제완료</Box>
              <Box color={progress == 2 ? "red" : "black"}>주문확인</Box>
              <Box color={progress == 3 ? "red" : "black"}>제조완료</Box>
            </Flex>
            <Progress
              colorScheme={"red"}
              mt={3}
              value={progressPercent()}
              height="9px"
              width="full"
              borderRadius={"5px"}
            />
          </Box>
        </Card>
        <Card variant={"outline"}>
          <Stack divider={<StackDivider />} spacing="">
            {order.orderProduct.map((item, index) => (
              <Box key={index} mb={2}>
                <Flex alignItems={"center"} p={5}>
                  <Image
                    w="120px"
                    h="120px"
                    src={
                      "https://huistudybucket01.s3.ap-northeast-2.amazonaws.com/" +
                      item.filePath
                    }
                  />
                  <Box ml={4}>
                    <Box fontSize={"18px"}>{item.productName}</Box>
                    {item.optionList && (
                      <Box>
                        {item.optionList.map((option, idx) => (
                          <Box key={idx} fontSize={"sm"}>
                            {option}
                          </Box>
                        ))}
                      </Box>
                    )}
                    <Box mt={3} fontSize={"21px"}>
                      {item.count}개
                    </Box>
                  </Box>
                  <Spacer />
                  <Box fontWeight={"bold"} fontSize={"23px"} mt={14}>
                    {(item.totalPrice * item.count).toLocaleString("ko-KR")}원
                  </Box>
                </Flex>
              </Box>
            ))}
          </Stack>
        </Card>
        <Card variant={"outline"} mb={4} mt={5} p={5} gap={2}>
          <Flex>
            <Box>결제수단</Box>
            <Spacer />
            <Box>{defineProvider(order.provider)}</Box>
          </Flex>
          <Flex>
            <Box>상품금액</Box>
            <Spacer />
            <Box fontWeight={"bold"} fontSize={"18px"}>
              {order.totalPrice.toLocaleString("ko-KR")}원
            </Box>
          </Flex>
          <Flex>
            <Box>할인금액</Box>
            <Spacer />
            <Box fontWeight={"bold"} fontSize={"18px"}>
              -{(order.couponCount * 2000).toLocaleString("ko-KR")}원
            </Box>
          </Flex>
          <Flex>
            <Box>결제금액</Box>
            <Spacer />
            <Box color={"red"} fontSize={"23px"} fontWeight={"bold"}>
              {(order.totalPrice - order.couponCount * 2000).toLocaleString(
                "ko-KR",
              )}
              원
            </Box>
          </Flex>
          <Flex mb={4}>
            <Box>스탬프 적립</Box>
            <Spacer />
            <Box fontWeight={"bold"}>{totalCount}개</Box>
          </Flex>
        </Card>
      </Box>
    </Box>
  );
}
