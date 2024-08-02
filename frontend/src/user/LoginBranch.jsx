import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  Input,
  InputGroup,
  Text,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LoginContext } from "../component/LoginProvider.jsx";
import { CustomToast } from "../component/CustomToast.jsx";

export function LoginBranch() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const account = useContext(LoginContext);
  const { successToast, errorToast } = CustomToast();

  function handleBranchLogin() {
    axios
      .post("/api/login/branch", { email, password })
      .then((res) => {
        account.login(res.data.token);
        successToast(res.data.name + "님! 환영합니다");
        navigate("/");
        window.scrollTo({ top: 0, behavior: "auto" });
      })
      .catch((err) => {
        account.logout();
        if (email.length === 0) {
          errorToast("이메일을 입력해주세요.");
        } else if (err.response.status === 401 || err.response.status === 403) {
          errorToast(err.response.data);
        } else errorToast("로그인을 실패하였습니다");
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
          <Box mt={8}>
            <Button
              onClick={handleBranchLogin}
              bg={"#fdd000"}
              color={"white"}
              width={"400px"}
              fontSize={"14px"}
              borderRadius={"40"}
              _hover={{ backgroundColor: "gray.300" }}
            >
              지점 로그인
            </Button>
          </Box>
          <Box display="flex" mt={6}>
            <Box
              fontSize="sm"
              ml={"auto"}
              cursor="pointer"
              as={"u"}
              color={"gray.500"}
              onClick={() => navigate("/find-branchEmail")}
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
              onClick={() => navigate("/find-branchPassword")}
            >
              비밀번호 찾기
            </Box>
          </Box>
        </Box>
      </Center>
    </>
  );
}
