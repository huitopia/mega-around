import { Box, Center, Heading, Text } from "@chakra-ui/react";
import React from "react";

export function ResultCustomerEmail() {
  // useEffect(() => {
  //   axios.get("/")
  // }, []);
  //
  return (
    <>
      <Box
        height={"280px"}
        backgroundColor={"#444444"}
        textAlign={"center"}
        display={"flex"}
        alignItems={"center"}
        justifyContent="center"
      >
        <Box>
          <Heading size="2xl" textColor={"#FDD000"}>
            MEGA AROUND
          </Heading>
          <Text textColor={"pink"}>이메일 찾기</Text>
        </Box>
      </Box>
      <Center>
        <Text mt={1} mb={8} fontSize={"25px"} fontWeight={"bold"}>
          회원님의 이메일은 {customer.email} 입니다.
        </Text>
      </Center>
    </>
  );
}
