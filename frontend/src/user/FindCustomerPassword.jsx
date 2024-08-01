import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomToast } from "../component/CustomToast.jsx";
import { formLabel } from "../component/css/style.js";

export function FindCustomerPassword() {
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
          <Text textColor={"pink"}>비밀번호 재설정</Text>
        </Box>
      </Box>
      <Center>
        <Box>
          <Center>
            <Box>
              <Center mt={10} fontSize={"lg"} fontWeight={"bold"}>
                <Text>고객 비밀번호 재설정</Text>
              </Center>
            </Box>
          </Center>
          <Box mt={8}>
            <FormControl>
              <FormLabel {...formLabel}>이메일</FormLabel>
              <InputGroup width={"400px"}>
                <Input
                  placeholder={"이메일을 입력하세요"}
                  sx={{ "::placeholder": { fontSize: "sm" } }}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </InputGroup>
            </FormControl>
          </Box>
          <Box mt={6}>
            <FormControl>
              <FormLabel {...formLabel}>비밀번호</FormLabel>
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
              bg={"#444444"}
              color={"white"}
              width={"400px"}
              fontSize={"14px"}
              borderRadius={"40"}
              _hover={{ backgroundColor: "gray.500" }}
            >
              비밀번호 재설정
            </Button>
          </Box>
        </Box>
      </Center>
    </>
  );
}
