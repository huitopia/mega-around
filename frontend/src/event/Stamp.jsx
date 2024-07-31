import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  Heading,
  Image,
  Spacer,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import longText from "./stampText.js";
import { StampModal } from "./component/StampModal.jsx";

function Stamp(props) {
  const boxes = Array.from({ length: 10 }, (_, i) => i + 1);
  const [stampCount, setStampCount] = useState(null);
  const [stampDate, setStampDate] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    axios.get("/api/event/stamp").then((res) => {
      setStampCount(res.data);
    });
    axios.get("/api/notice/stamp").then(res => {
      function createDate(data) {
        const result = [];
        data.map((item) => {
            const arr = item.content.split(" ");
            const count = parseInt(arr[1].replace("개",""));
            for (let i = 0; i < count; i++) {
              result.push(item.createdAtString);
            }
        }
          )
        return result;
      }

      const date = createDate(res.data);
      setStampDate(date)});
  }, []);

  if (stampCount === null || stampDate === null) {
    return <Spinner />;
  }

  return (
    <Box maxWidth="1000px" mx={"auto"}>
      <Box>
        <Heading>Stamp</Heading>
      </Box>
      <Divider border={"1px solid black"} my={4} />
      <Flex justify={"right"}>
        <Flex gap={2}>
          <Heading>스탬프</Heading>
          <Heading color={"red"}>{stampCount}</Heading>
        </Flex>
        <Spacer/>
        <Button onClick={() => onOpen()} colorScheme={"orange"} borderRadius={"20px"} w={"170px"}>적립내역 보기</Button>
      </Flex>
      <Flex justify={"center"} mt={10}>
        <Box bgColor={"yellow"} w={"520px"} h={"300px"} borderRadius={"20px"}>
          <Flex alignItems="center" height="300" justifyContent="center">
            <Grid templateColumns="repeat(5, 1fr)" gap={7} alignItems="center">
              {boxes.map((box) => (
                <Box key={box}>
                  {stampCount < box ? (
                    <Box
                      bg="rgba(0, 0, 0, 0.1)"
                      borderRadius="full"
                      w="50px"
                      h="50px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      color="white"
                    >
                      {box}
                    </Box>
                  ) : (
                    <Box
                      position="relative"
                      display="inline-block"
                      cursor="pointer"
                      _hover={{ ".description": { opacity: 1 } }}
                    >
                      <Image
                        w="50px"
                        h="80px"
                        src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbXtHba%2FbtsICfOOFVO%2Fg6xk09ztnHMPKMJQKEuYjK%2Fimg.png"
                      />
                      <Box
                        w={"150px"}
                        h={"40px"}
                        className="description"
                        position="absolute"
                        top="12"
                        left="-10"
                        right="0"
                        bottom="0"
                        bg="rgba(0, 0, 0, 0.5)"
                        color="white"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        opacity="0"
                        transition="opacity 0.3s ease"
                        zIndex={1}
                        borderRadius={"10px"}
                      >
                        <Text fontSize="xs">  발급일: {stampDate[box-1]}
                        </Text>
                      </Box>
                    </Box>
                  )}
                </Box>
              ))}
            </Grid>
          </Flex>
        </Box>
      </Flex>
      <Box bg={"#f8f9fa"} mt={12} p={7}>
        <Text fontWeight={"bold"}>유의사항</Text>
        <Box whiteSpace="pre-line" fontSize={"sm"} lineHeight={2}>{longText}</Box>
      </Box>
      <StampModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}

export default Stamp;
