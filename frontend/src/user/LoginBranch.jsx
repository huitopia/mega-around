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
  const { successToast, errorToast, infoToast } = CustomToast();

  function handleBranchLogin() {
    axios
      .post("/api/login/branch", { email, password })
      .then((res) => {
        account.login(res.data.token);
        successToast("로그인 되었습니다");
        navigate("/");
      })
      .catch((err) => {
        account.logout();
        if (err.response.status === 401) {
          errorToast("비밀번호가 맞지 않습니다.");
        } else if (err.response.status === 403) {
          errorToast("가입되지 않은 이메일입니다.");
        } else errorToast("로그인에 실패하였습니다.");
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
