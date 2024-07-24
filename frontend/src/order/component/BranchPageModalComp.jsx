import {
  Box,
  Button,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner
} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import axios from "axios";

export function BranchPageModalComp({isOpen, onClose, stateId}) {
  const [orderItem, setOrderItem] = useState(null);

  useEffect(() => {
    axios.get(`/api/orders/${7}`).then(res => {setOrderItem(res.data)
      console.log(res.data)});
  }, []);

  if (orderItem === null) {
    return <Spinner/>
  }

  function handleStateChange() {
    axios.put(`/api/orders/${orderItem.id}`,stateId + 1, {
      headers: {
        'Content-Type': 'application/json'
      }}).then();
  }

  return <Modal isOpen={isOpen} onClose={onClose}>
    <ModalContent>
      <ModalHeader>주문 상세</ModalHeader>
      <ModalBody>
        // TODO. request, 포장 옵션 등 추가
        {orderItem.orderProduct.map((item, index) => (
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
      </ModalBody>
      <ModalFooter>
        <Button onClick={onClose}>닫기</Button>
        {stateId === 2 || <Button onClick={handleStateChange}>{stateId === 0 ? "제조중으" : "제조완료"}로 변경</Button>}
      </ModalFooter>
    </ModalContent>
  </Modal>;
}