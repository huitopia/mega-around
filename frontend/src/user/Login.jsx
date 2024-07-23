import {
  Box,
  Button,
  Center,
  Divider,
  FormControl,
  Heading,
  Input,
  InputGroup,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  function handleCustomerLogin() {
    axios
      .post("/api/login/customer", { email, password })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        toast({
          description: "로그인 되었습니다",
          status: "success",
          position: "top",
          duration: 2000,
        });
        navigate("/");
      })
      .catch(() => {
        localStorage.removeItem("token");
        toast({
          description: "로그인에 실패하였습니다.",
          status: "error",
          position: "top",
          duration: 2000,
        });
      });
  }

  return (
    <>
      <Center>
        <Box>
          <Center>
            <Box>
              <Heading mt={20} color={"#fdd000"}>
                mega-around
              </Heading>
              <Center mt={5} fontSize={"lg"} fontWeight={"bold"}>
                <Text>회원 로그인</Text>
              </Center>
            </Box>
          </Center>
          <Box mt={8}>
            <FormControl>
              <InputGroup width={"400px"}>
                <Input
                  placeholder={"이메일을 입력하세요"}
                  sx={{ "::placeholder": { fontSize: "sm" } }}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </InputGroup>
            </FormControl>
          </Box>
          <Box mt={3}>
            <FormControl>
              <InputGroup width={"400px"}>
                <Input
                  placeholder={"비밀번호를 입력하세요"}
                  sx={{ "::placeholder": { fontSize: "sm" } }}
                  type={"password"}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </InputGroup>
            </FormControl>
          </Box>
          <Box mt={10}>
            <Button
              onClick={handleCustomerLogin}
              bg={"black"}
              color={"white"}
              width={"400px"}
              fontSize={"14px"}
              borderRadius={"40"}
            >
              이메일로 로그인
            </Button>
          </Box>
          {/*<Box position="relative" padding="10" mt={5}>*/}
          {/*  <Divider />*/}
          {/*  <AbsoluteCenter bg="white" px="4">*/}
          {/*    또는*/}
          {/*  </AbsoluteCenter>*/}
          {/*</Box>*/}
          <Divider mt={10} />

          <Center>
            <Button
              mt={10}
              borderColor={"#fdd000"}
              variant={"outline"}
              bg={"white"}
              color={"black"}
              width={"200px"}
              fontSize={"14px"}
              borderRadius={"40"}
              onClick={() => navigate("/login/branch")}
            >
              지점 로그인 페이지
            </Button>
          </Center>
        </Box>
      </Center>
    </>
  );
}
