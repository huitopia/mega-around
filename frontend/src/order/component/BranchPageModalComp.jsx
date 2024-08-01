import {
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { CustomToast } from "../../component/CustomToast.jsx";

export function BranchPageModalComp({
  isOpen,
  onClose,
  stateId,
  orderId,
  setIsChanged,
}) {
  const [orderItem, setOrderItem] = useState({
    orderProduct: [],
  });
  const { successToast, errorToast } = CustomToast();

  useEffect(() => {
    if (orderId !== 0) {
      axios.get(`/api/orders/${orderId}`).then((res) => {
        setOrderItem(res.data);
        console.log(res.data);
      });
    }
  }, [orderId]);

  if (orderItem === null) {
    return <Spinner />;
  }

  function handleStateChange() {
    axios
      .put(`/api/orders`, orderItem, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        onClose();
        successToast("변경되었습니다");
        setIsChanged(true);
      })
      .catch(() => errorToast("변경 실패했습니다. 다시 시도해주세요"));
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader fontSize={"25px"}>{orderItem.id} 번 주문</ModalHeader>
        <ModalBody>
          <Flex>
            <Box fontWeight={"bold"} mr={5}>
              요청사항
            </Box>
            <Box>{orderItem.request}</Box>
          </Flex>
          <Flex mb={5}>
            <Box fontWeight={"bold"} mr={5}>
              포장옵션
            </Box>
            <Box>
              <Box>
                {orderItem.isTakeOut == 1
                  ? "포장해주세요."
                  : "매장에서 먹고 갈게요"}
              </Box>
              <Box>
                {orderItem.option &&
                  (orderItem.option[0] ? "캐리어/봉투 필요해요" : "")}
              </Box>
            </Box>
          </Flex>
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
              {index < orderItem.orderProduct.length - 1 && (
                <Divider borderColor="gray.200" my={4} />
              )}
            </Box>
          ))}
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose} mr={3} colorScheme={"pink"}>
            닫기
          </Button>
          {stateId === 3 || (
            <Button onClick={handleStateChange} colorScheme={"orange"}>
              {stateId === 1 ? "제조중으" : "제조완료"}로 변경
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
