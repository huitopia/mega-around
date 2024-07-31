import React from "react";
import {
  Button,
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
  modalheader,
  modalbody,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{modalheader}</ModalHeader>
        <ModalBody pb={9}>
          {modalbody}
          <Text fontWeight="bold" mb="1rem"></Text>
          <Input
            type="password"
            placeholder="비밀번호 입력"
            onChange={(e) => setPassword(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            mr={2}
            onClick={onConfirm}
            isLoading={isLoading}
            colorScheme="blue"
            width={"80px"}
          >
            확인
          </Button>
          <Button onClick={onClose} width={"80px"} mr={3}>
            취소
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmationModal;
