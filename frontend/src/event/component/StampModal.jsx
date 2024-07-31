import {
  Box,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

export function StampModal({ isOpen, onClose }) {
  const [stampList, setStampList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/notice/stamp").then((res) => {
      setStampList(res.data);
      setIsLoading(false);
    });
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>적립 내역</ModalHeader>
        <ModalBody>
          {isLoading ? (
            <Spinner />
          ) : (
            stampList.map((stamp, index) => (
              <Box key={index}>
                <Box>{stamp.content}</Box>
                <Box>{stamp.createdAtString}</Box>
                {index < stampList.length - 1 && (
                  <Divider borderColor="gray.200" my={4} />
                )}
              </Box>
            ))
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
