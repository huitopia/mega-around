import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@chakra-ui/react";
import {useEffect} from "react";

export function BranchPageModalComp({isOpen, onClose, stateId}) {
  useEffect(() => {

  }, []);

  return <Modal isOpen={isOpen} onClose={onClose}>
    <ModalContent>
      <ModalHeader>주문 상세</ModalHeader>
      <ModalBody></ModalBody>
      <ModalFooter>
        <Button>닫기</Button>
        {stateId === 2 || <Button>{stateId === 0 ? "제조중으" : "제조완료"}로 변경</Button>}
      </ModalFooter>
    </ModalContent>
  </Modal>;
}