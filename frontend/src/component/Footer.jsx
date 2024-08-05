import { Box, Flex, Image } from "@chakra-ui/react";

export const Footer = () => (
  <Box height={"200px"} mt={"100px"} width={"100%"}>
    <Box
      height={"50px"}
      backgroundColor={"yellow"}
      color={"#444444"}
      fontWeight={"bold"}
      fontSize={"16px"}
      display="flex"
      alignItems="center"
      gap={6}
    >
      <Box ml={4}>이용약관</Box>
      <Box>개인정보처리방침</Box>
    </Box>
    <Box height={"150px"} backgroundColor={"#444444"} color={"white"}>
      <Flex justify={"space-between"}>
        <Box mt={4} ml={"20px"}>
          <Flex gap={2}>
            <Box fontWeight={"bold"} fontSize={"25px"} mr={3}>
              MEGA AROUND
            </Box>
            <Box
              position="relative"
              display="inline-block"
              cursor="pointer"
              _hover={{ ".description": { opacity: 1 } }}
            >
              <a href={"https://github.com/huitopia"}>
                <Image
                  w={"35px"}
                  h={"35px"}
                  src={
                    "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FIVgKv%2FbtsIUVuC04H%2FDekwiPhFMpZBkZxkwalEU1%2Fimg.png"
                  }
                />
              </a>
              <Box
                w={"80px"}
                h={"20px"}
                className="description"
                position="absolute"
                top="12"
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
                zIndex={1}
                borderRadius={"10px"}
              >
                김다희
              </Box>
            </Box>
            <Box
              position="relative"
              display="inline-block"
              cursor="pointer"
              _hover={{ ".description": { opacity: 1 } }}
            >
              <a href={"https://github.com/jnn-jnn1"}>
                <Image
                  w={"35px"}
                  h={"35px"}
                  src={
                    "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FIVgKv%2FbtsIUVuC04H%2FDekwiPhFMpZBkZxkwalEU1%2Fimg.png"
                  }
                />
              </a>
              <Box
                w={"80px"}
                h={"20px"}
                className="description"
                position="absolute"
                top="12"
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
                zIndex={1}
                borderRadius={"10px"}
              >
                안진아
              </Box>
            </Box>
            <Box
              position="relative"
              display="inline-block"
              cursor="pointer"
              _hover={{ ".description": { opacity: 1 } }}
            >
              <a href={"https://github.com/kiwi85547"}>
                <Image
                  w={"35px"}
                  h={"35px"}
                  src={
                    "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FIVgKv%2FbtsIUVuC04H%2FDekwiPhFMpZBkZxkwalEU1%2Fimg.png"
                  }
                />
              </a>
              <Box
                w={"80px"}
                h={"20px"}
                className="description"
                position="absolute"
                top="12"
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
                zIndex={1}
                borderRadius={"10px"}
              >
                조화영
              </Box>
            </Box>
            <Box fontSize={"xs"} mt={5}>
              Visit our Github!
            </Box>
          </Flex>
          <Box fontSize={"13px"} color={"#aaaaaa"} mt={4}>
            <Flex gap={3}>
              <Box fontWeight={"bold"} color={"white"}>
                주식회사 메가어라운드
              </Box>
              <Box>팀장 김다희</Box>
              <Box>팀원 안진아 조화영</Box>
            </Flex>
            <Flex gap={3}>
              <Box>사업자등록번호 105-12-12345</Box>
              <Box>서울특별시 강남구 강남대로</Box>
            </Flex>
          </Box>
        </Box>
        <Box>
          <Flex gap={"60px"} color={"#aaaaaa"} mr={8} mt={4}>
            <Box lineHeight={"25px"}>
              <Flex gap={1}>
                <Box color={"white"} fontSize={"18px"} mb={1}>
                  김다희
                </Box>
                <Box fontSize={"xs"}>Huitopia</Box>
              </Flex>
              <Box fontSize={"13px"}>GitHub 관리</Box>
              <Box fontSize={"13px"}>지도 API</Box>
              <Box fontSize={"13px"}>상품 페이지</Box>
            </Box>
            <Box lineHeight={"25px"}>
              <Flex gap={1}>
                <Box color={"white"} fontSize={"18px"} mb={1}>
                  안진아
                </Box>
                <Box fontSize={"xs"}>jnn-jnn1</Box>
              </Flex>
              <Box fontSize={"13px"}>주문 /결제</Box>
              <Box fontSize={"13px"}>장바구니</Box>
              <Box fontSize={"13px"}>스탬프 / 쿠폰</Box>
            </Box>
            <Box lineHeight={"25px"}>
              <Flex gap={1}>
                <Box color={"white"} fontSize={"18px"} mb={1}>
                  조화영
                </Box>
                <Box fontSize={"xs"}>kiwi85547</Box>
              </Flex>
              <Box fontSize={"13px"}>고객 / 지점 관리</Box>
              <Box fontSize={"13px"}>메인 페이지</Box>
              <Box fontSize={"13px"}>회원가입 / 로그인</Box>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Box>
  </Box>
);
