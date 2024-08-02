import { Box, Button, Center, Flex, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function SignUp() {
  const navigate = useNavigate();
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
          <Text textColor={"pink"}>회원가입</Text>
        </Box>
      </Box>
      <Center mt={"140px"}>
        <Flex w={700} justifyContent={"space-between"}>
          <Button
            w={250}
            h={20}
            bgColor={"#ffde00"}
            onClick={() => navigate("/signup/customer")}
          >
            개인 회원가입
          </Button>
          <Button
            w={250}
            colorScheme={"orange"}
            h={20}
            onClick={() => navigate("/signup/branch")}
          >
            지점 회원가입
          </Button>
        </Flex>
      </Center>
    </>
  );
}
