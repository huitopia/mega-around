import {
  Box,
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
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
      <ModalContent mt={"200px"}>
        <ModalHeader>적립 내역</ModalHeader>
        <ModalBody>
          <Box
            h={"400px"}
            overflowY={"scroll"}
            css={{
              "&::-webkit-scrollbar": {
                width: "8px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "#888",
                borderRadius: "4px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                background: "#555",
              },
              "&::-webkit-scrollbar-track": {
                background: "#f1f1f1",
              },
            }}
          >
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
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme={"pink"} onClick={onClose}>
            닫기
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
