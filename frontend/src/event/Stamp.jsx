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
} from "@chakra-ui/react";
import axios from "axios";
import longText from "./stampText.js";

function Stamp(props) {
  const boxes = Array.from({ length: 10 }, (_, i) => i + 1);
  const [stampCount, setStampCount] = useState(null);

  useEffect(() => {
    axios.get("/api/event/stamp").then((res) => {
      setStampCount(res.data);
    });
  }, []);

  if (stampCount === null) {
    return <Spinner />;
  }

  return (
    <Box maxWidth="1000px" mx={"auto"}>
      <Box>
        <Heading>Stamp</Heading>
      </Box>
      <Divider border={"1px solid black"} my={4} />
      <Flex>
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
                        w={"100px"}
                        h={"20px"}
                        className="description"
                        position="absolute"
                        top="20"
                        left="-5"
                        right="0"
                        bottom="0"
                        bg="rgba(0, 0, 0, 0.5)"
                        color="white"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        opacity="0"
                        transition="opacity 0.3s ease"
                      >
                        <Text fontSize="sm">설명</Text>
                      </Box>
                    </Box>
                  )}
                </Box>
              ))}
            </Grid>
          </Flex>
        </Box>
        <Spacer />
        <Button>적립내역 보기</Button>
      </Flex>
      <Box bg={"#f8f9fa"}>
        <Text>유의사항</Text>
        <Box whiteSpace="pre-line">{longText}</Box>
      </Box>
    </Box>
  );
}

export default Stamp;
