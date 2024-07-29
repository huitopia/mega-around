import {
  Badge,
  Box,
  Center,
  Flex,
  Image,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { BranchPageModalComp } from "./BranchPageModalComp.jsx";

export function OrderManageComp({
  stateId,
  branchId,
  text,
  setIsChanged,
  isChanged,
}) {
  const [orderList, setOrderList] = useState(null);
  const { onClose, isOpen, onOpen } = useDisclosure();
  const [orderId, setOrderId] = useState(0);

  useEffect(() => {
    setIsChanged(false);
    axios
      .get(`/api/orders/list?stateId=${stateId}&branchId=${branchId}`)
      .then((res) => setOrderList(res.data));
  }, [isChanged]);

  if (orderList === null) {
    return <Spinner />;
  }

  return (
    <Flex h={"180px"}>
      <Center bg={"pink"} w={"150px"}>
        <Box>{text}</Box>
        <Box>({orderList.length})</Box>
      </Center>
      <Box border={"1px solid black"} w={"800px"}>
        <Flex>
          {orderList.map((order, index) => (
            <Box
              key={index}
              onClick={() => {
                onOpen();
                setOrderId(order.id);
              }}
              zIndex={1}
              border={"1px solid black"}
              w={"150px"}
              h={"150px"}
            >
              <Box>
                {order.orderProduct[0].productName}{" "}
                {order.orderProduct[0].count}개
                {order.orderProduct.length > 1 && (
                  <Badge colorScheme={"green"}>
                    외 {order.orderProduct.length - 1}개
                  </Badge>
                )}
                {order.orderProduct[0].optionList.length > 0 && (
                  <Badge>옵션</Badge>
                )}
              </Box>
              <Image
                w={"120px"}
                h={"120px"}
                src={
                  "https://huistudybucket01.s3.ap-northeast-2.amazonaws.com/" +
                  order.orderProduct[0].filePath
                }
              />
            </Box>
          ))}
        </Flex>
      </Box>
      <BranchPageModalComp
        isOpen={isOpen}
        onClose={onClose}
        stateId={stateId}
        orderId={orderId}
        setIsChanged={setIsChanged}
      />
    </Flex>
  );
}
