import React from "react";
import {
  Button,
  Center,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
  setPassword,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>확인 요청</ModalHeader>
        <ModalBody pb={5} pt={3} ml={10} mr={10}>
          <Text mb="1.1rem" fontWeight={600}>
            본인 확인을 위해 비밀번호를 입력해 주세요
          </Text>
          <Input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Text
            color={"gray"}
            fontSize={"0.7rem"}
            mt={1}
            ml={2}
            whiteSpace={"pre-wrap"}
          >
            * 영문 대/소문자, 숫자, 특수문자를 하나 이상 포함하여 8-20자 이내로
            입력해 주세요.
          </Text>
        </ModalBody>
        <Center>
          <ModalFooter display={"flex"}>
            <Button onClick={onClose} width={"100px"} mr={3}>
              취소
            </Button>
            <Button
              mr={2}
              onClick={onConfirm}
              isLoading={isLoading}
              colorScheme="green"
              width={"100px"}
            >
              확인
            </Button>
          </ModalFooter>
        </Center>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmationModal;
