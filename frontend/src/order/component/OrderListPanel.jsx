import { Box, Divider, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function OrderListPanel({ period }) {
  const [orderList, setOrderList] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/orders/list?period=${period}`).then((res) => {
      setOrderList(res.data);
      console.log(res.data);
    });
  }, []);

  const getStateMessage = (stateId) => {
    switch (stateId) {
      case 1:
        return "결제완료";
      case 2:
        return "제조중";
      case 3:
        return "제조완료";
    }
  };

  if (orderList === null) {
    return <Box>주문 내역이 없어요</Box>;
  }

  return (
    <Box>
      <Box
        height="800px"
        overflowY={"scroll"}
        css={{
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#888",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#555",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
          },
        }}
      >
        {orderList.map((order, index) => (
          <Box
            key={index}
            onClick={() => navigate(`/order/${order.id}`)}
            cursor={"pointer"}
          >
            <Box fontWeight={"bold"} color={"#5b5859"}>
              {getStateMessage(order.stateId)}
            </Box>
            <Box fontWeight={"bold"} fontSize={"lg"}>
              {order.branchName}
            </Box>
            <Flex gap={3} fontSize={"sm"}>
              <Box>
                {order.orderProduct[0].productName}
                {order.orderProduct.length === 1 &&
                  `${order.orderProduct.length} 개`}
                {order.orderProduct.length > 1 &&
                  ` 외 ${order.orderProduct.length - 1}개`}
              </Box>
              <Box>|</Box>
              <Box>{order.createdAtString.substring(0, 13)}</Box>
            </Flex>
            {orderList.length - 1 > index && (
              <Divider border={"1px solid gray.200"} my={4} w={"950px"} />
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
