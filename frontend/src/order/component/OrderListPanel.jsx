import { Box, Divider, Flex, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

export function OrderListPanel(period) {
  const [orderList, setOrderList] = useState(null);

  useEffect(() => {
    const periodString = period.period;
    axios.get(`/api/orders/list?period=${periodString}`).then((res) => {
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
    return <Spinner />;
  }

  return (
    <Box>
      <Box>
        {orderList.map((order, index) => (
          <Box key={index}>
            <Box>{getStateMessage(order.stateId)}</Box>
            <Box>{order.branchName}</Box>
            <Flex gap={3}>
              <Box>
                {order.orderProduct[0].productName}
                {order.orderProduct.length === 1 &&
                  `${order.orderProduct.length} 개`}
                {order.orderProduct.length > 1 &&
                  `외 ${order.orderProduct.length - 1}개`}
              </Box>
              <Box>|</Box>
              <Box>{order.createdAtString.substring(0, 13)}</Box>
            </Flex>
            {orderList.length - 1 > index && (
              <Divider border={"1px solid gray"} my={4} />
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
