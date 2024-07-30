import { Box, Flex, Image } from "@chakra-ui/react";

export function CouponComp() {
  return (
    <Flex
      border={"1px solid black"}
      w={"500px"}
      h={"100px"}
      alignItems={"center"}
    >
      <Box>
        <Image
          w={"70px"}
          h={"70px"}
          src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbhB2Nb%2FbtsIQHw0raP%2FGUCqmIclgTJka0PmcJRQGK%2Fimg.jpg"
        />
      </Box>
      <Box>
        <Box as={"mark"} fontSize="14px">
          메가어라운드
        </Box>
        <Box fontWeight={"bold"}>아메리카노(HOT/ICE) 1잔 무료</Box>
        <Box fontSize="12px">또는 2,000원 할인을 적용해드립니다.</Box>
      </Box>
    </Flex>
  );
}
