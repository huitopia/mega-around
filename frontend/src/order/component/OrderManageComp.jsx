import {Box, Center, Flex, Image, Spinner, useDisclosure} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import axios from "axios";
import {BranchPageModalComp} from "./BranchPageModalComp.jsx";

export function OrderManageComp({stateId, branchId, text}) {
  const [orderList, setOrderList] = useState(null);
  const {onClose, isOpen, onOpen} = useDisclosure();

  useEffect(() => {
    axios.get(`/api/orders/list?stateId=${stateId}&branchId=${branchId}`).then(res => setOrderList(res.data));
  }, []);

  if (orderList === null) {
    return <Spinner/>
  }

  return (
    <Flex h={"180px"}>
      <Center bg={"pink"} w={"150px"}>
        <Box>{text}</Box>
        <Box>({0})</Box>
      </Center>
      <Box border={"1px solid black"} w={"800px"}>
        {orderList.map((order,index) => (<Flex key={index}>
          {order.orderProduct.map((product) =>
            (<Box key={product.productName} onClick={onOpen}>
            <Box>{product.productName} {order.orderProduct.length > 1 && "외 " + (order.orderProduct.length - 1) + "개"}</Box>
            <Image
              w="150px"
              h="150px"
              src={`https://huistudybucket01.s3.ap-northeast-2.amazonaws.com/${product.filePath}`} />
          </Box>))}
          </Flex>))}
      </Box>
      <BranchPageModalComp isOpen={isOpen} onClose={onClose} stateId={stateId}/>
    </Flex>
  );
}
