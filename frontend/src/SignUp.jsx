import { Button, Center, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function SignUp() {
  const navigate = useNavigate();
  return (
    <>
      <Center>
        <Flex w={700} justifyContent={"space-between"} m={200}>
          <Button
            w={300}
            colorScheme={"yellow"}
            h={100}
            onClick={() => navigate("/signup/customer")}
          >
            개인 회원가입
          </Button>
          <Button
            w={300}
            colorScheme={"orange"}
            h={100}
            onClick={() => navigate("/signup/branch")}
          >
            지점 회원가입
          </Button>
        </Flex>
      </Center>
    </>
  );
}
