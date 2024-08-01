import { Box, Flex, Image, Spacer } from "@chakra-ui/react";

export function CouponComp() {
  return (
    <Flex
      border={"1px solid #adb5bd"}
      w={"950px"}
      h={"250px"}
      alignItems={"center"}
    >
      <Box ml={5}>
        <Image
          w={"200px"}
          h={"200px"}
          src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbhB2Nb%2FbtsIQHw0raP%2FGUCqmIclgTJka0PmcJRQGK%2Fimg.jpg"
        />
      </Box>
      <Box>
        <Box as={"mark"} fontSize="20px">
          메가어라운드
        </Box>
        <Box fontSize={"35px"} fontWeight={"bold"}>
          아메리카노(HOT/ICE) 1잔 무료
        </Box>
        <Box ml={1} fontSize="17px">
          또는 2,000원 할인
        </Box>
      </Box>
      <Spacer />
      <Flex
        pr={3}
        bg={"#401F02"}
        w={"190px"}
        h={"100%"}
        color={"white"}
        whiteSpace="pre-line"
        align={"center"}
        justify={"center"}
        fontWeight={"bold"}
        fontSize={"20px"}
      >
        C O U P O N{" "}
      </Flex>
    </Flex>
  );
}
