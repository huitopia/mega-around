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
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomToast } from "../component/CustomToast.jsx";

export function FindCustomerEmail() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { successToast, errorToast, infoToast } = CustomToast();
  function handleCustomerPassword() {
    axios
      .put(`/api/user/customer/password`, { email, password })
      .then(() => {
        successToast(`비밀번호가 재설정 되었습니다`);
        navigate("/login");
      })
      .catch(() => {
        errorToast("가입 한 이메일이 없습니다");
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
                <Text>비밀번호 재설정</Text>
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
                  placeholder={"재설정 할 비밀번호를 입력하세요"}
                  sx={{ "::placeholder": { fontSize: "sm" } }}
                  type={"password"}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </InputGroup>
            </FormControl>
          </Box>
          <Box mt={10}>
            <Button
              onClick={handleCustomerPassword}
              bg={"black"}
              color={"white"}
              width={"400px"}
              fontSize={"14px"}
              borderRadius={"40"}
            >
              비밀번호 재설정
            </Button>
          </Box>
        </Box>
      </Center>
    </>
  );
}
