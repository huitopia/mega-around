import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  Input,
  InputGroup,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function LoginBranch() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  function handleBranchLogin() {
    axios
      .post("/api/login/branch", { email, password })
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
                <Text>지점 로그인</Text>
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
              onClick={handleBranchLogin}
              bg={"#fdd000"}
              color={"white"}
              width={"400px"}
              fontSize={"14px"}
              borderRadius={"40"}
            >
              지점 로그인
            </Button>
          </Box>
        </Box>
      </Center>
    </>
  );
}
