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
} from "@chakra-ui/react";
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../component/LoginProvider.jsx";
import { CustomToast } from "../component/CustomToast.jsx";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const account = useContext(LoginContext);
  const { successToast, errorToast, infoToast } = CustomToast();
  function handleCustomerLogin() {
    axios
      .post("/api/login/customer", { email, password })
      .then((res) => {
        account.login(res.data.token);
        successToast(`${res.data.name}님! 환영합니다.`);
        navigate("/");
      })
      .catch((err) => {
        account.logout();
        if (email.length === 0) {
          errorToast("이메일을 입력해주세요.");
        } else {
          const errorMessage = err.response
            ? err.response.data
            : "로그인에 실패하였습니다.";
          errorToast(errorMessage);
        }
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

          <Box mt={8}>
            <Button
              onClick={handleCustomerLogin}
              bg={"black"}
              color={"white"}
              width={"400px"}
              fontSize={"14px"}
              borderRadius={"40"}
              _hover={{ backgroundColor: "gray.600" }}
            >
              이메일로 로그인
            </Button>
          </Box>

          <Box display="flex" mt={6}>
            <Box
              fontSize="sm"
              ml={"auto"}
              cursor="pointer"
              as={"u"}
              color={"gray.500"}
              onClick={() => navigate("/find-customerEmail")}
            >
              이메일 찾기
            </Box>
            <Box
              fontSize="sm"
              ml={"auto"}
              mr="80px"
              cursor="pointer"
              as={"u"}
              color={"gray.500"}
              onClick={() => navigate("/find-customerPassword")}
            >
              비밀번호 찾기
            </Box>
          </Box>

          {/*<Box position="relative" padding="10" mt={0}>*/}
          {/*  <Divider />*/}
          {/*  <AbsoluteCenter bg="white" px="4">*/}
          {/*    또는*/}
          {/*  </AbsoluteCenter>*/}
          {/*</Box>*/}
          <Divider mt={6} />

          <Center>
            <Button
              mt={6}
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
