import {
  Button,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React from "react";

const DeleteModal = ({ isOpen, onClose, onConfirm, isLoading }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>확인 요청</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={5} pt={3} ml={10}>
          <Text fontWeight="bold" mb="1rem">
            정말로 탈퇴하시겠어요?
          </Text>
          <Text mb={"1rem"}>탈퇴 시 계정은 삭제되며 복구되지 않습니다.</Text>
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
              colorScheme="red"
              width={"100px"}
            >
              탈퇴
            </Button>
          </ModalFooter>
        </Center>
      </ModalContent>
    </Modal>
  );
};

export default DeleteModal;
