import { Button, Center, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function SignUp() {
  const navigate = useNavigate();
  return (
    <>
      <Center>
        <Flex w={700} justifyContent={"space-between"} m={200}>
          <Button
            mx={{
              base: 100,
              lg: 50,
            }}
            w={250}
            bgColor={"#ffde00"}
            h={20}
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
