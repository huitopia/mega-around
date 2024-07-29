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
        <ModalBody>{modalbody}</ModalBody>
        <ModalFooter>
          <Input
            mr={2}
            type={"password"}
            // variant="flushed"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            mr={2}
            onClick={onConfirm}
            isLoading={isLoading}
            // variant="outline"
            colorScheme="blue"
            borderWidth={2}
          >
            확인
          </Button>
          <Button
            onClick={onClose}
            variant="outline"
            colorScheme="gray"
            borderWidth={2}
          >
            취소
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmationModal;
