import { Button, Flex, Heading, Input, useToast } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickName, setNickName] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  function handleSignup() {
    axios
      .post("/api/user/customer", { email, password, nickName })
      .then(() =>
        toast({
          description: "회원가입이 성공하였습니다.",
          status: "success",
          position: "top",
          duration: "2000",
        }),
      )
      .catch(() =>
        toast({
          description: "회원가입이 실패하였습니다.",
          status: "error",
          position: "top",
          duration: "2000",
        }),
      );
  }

  return (
    <>
      <Flex>
        <Heading>고객 회원가입</Heading>
        <Button
          ml={10}
          colorScheme={"teal"}
          onClick={() => navigate("/signup/branch")}
        >
          지점 회원가입
        </Button>
      </Flex>
      이메일
      <br />
      <Input type="email" onChange={(e) => setEmail(e.target.value)} />
      비밀번호
      <br />
      <Input type="password" onChange={(e) => setPassword(e.target.value)} />
      닉네임
      <br />
      <Input onChange={(e) => setNickName(e.target.value)} />
      <Button onClick={handleSignup} colorScheme={"blue"} mt={5}>
        회원가입
      </Button>
    </>
  );
}
