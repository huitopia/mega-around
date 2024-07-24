import {
  Box,
  Divider,
  Flex,
  Heading,
  Image,
  Progress,
  Spacer,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
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

  const progressPercent = (progress / 2) * 100;

  if (order === null) {
    return <Spinner />;
  }

  const totalCount = order.orderProduct.reduce(
    (sum, product) => sum + product.count,
    0,
  );

  return (
    <Box maxWidth="1000px" mx="auto">
      <Box mb={4}>
        <Heading>Order Detail</Heading>
      </Box>
      <Divider border="1px solid black" my={4} />
      <Box mb={4}>
        <Box mb={2}>
          1시간 이내에 찾아가지 않으실 경우 품질 및 보관 문제로 폐기 될 수
          있습니다.
        </Box>
        <Box mb={2}>
          <Box>{order.branchName}</Box>
          <Box>주문번호: {order.id}</Box>
          <Box>{order.createdAtString}</Box>
        </Box>
        <Box>까지 제조가 완료될 예정입니다.</Box>
      </Box>
      <Box mb={4}>
        <Flex justifyContent="space-between">
          <Box>결제완료</Box>
          <Box>제조중</Box>
          <Box>제조완료</Box>
        </Flex>
        <Progress mt={3} value={progressPercent} height="3px" width="full" />
      </Box>
      {order.orderProduct.map((item, index) => (
        <Box key={index} mb={4}>
          <Flex>
            <Image
              w="50px"
              h="50px"
              src={
                "https://huistudybucket01.s3.ap-northeast-2.amazonaws.com/" +
                item.filePath
              }
            />
            <Box ml={4}>
              <Box>{item.productName}</Box>
              {item.optionList && (
                <Box>
                  {item.optionList.map((option, idx) => (
                    <Box key={idx}>{option}</Box>
                  ))}
                </Box>
              )}
              <Box>{item.count}개</Box>
            </Box>
          </Flex>
        </Box>
      ))}
      <Box mb={4}>
        <Flex>
          <Box>총 금액</Box>
          <Spacer />
          <Box>{order.totalPrice.toLocaleString("ko-KR")}원</Box>
        </Flex>
      </Box>
      <Box mb={4}>
        <Flex>
          <Box>결제수단</Box>
          <Spacer />
          <Box>{order.provider}</Box>
        </Flex>
        <Flex>
          <Box>상품금액</Box>
          <Spacer />
          <Box>{order.totalPrice.toLocaleString("ko-KR")}원</Box>
        </Flex>
        <Flex>
          <Box>할인금액</Box>
          <Spacer />
          <Box>-{(order.couponCount * 2000).toLocaleString("ko-KR")}원</Box>
        </Flex>
        <Flex>
          <Box>결제금액</Box>
          <Spacer />
          <Box>
            {(order.totalPrice - order.couponCount * 2000).toLocaleString(
              "ko-KR",
            )}
            원
          </Box>
        </Flex>
      </Box>
      <Box mb={4}>
        <Flex>
          <Box>스탬프 적립</Box>
          <Spacer />
          <Box>{totalCount}개</Box>
        </Flex>
      </Box>
    </Box>
  );
}
