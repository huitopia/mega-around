import {
  Box,
  Button,
  Center,
  FormControl,
  FormHelperText,
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

export function FindCustomerEmail() {
  const [nickName, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { successToast, errorToast, infoToast } = CustomToast();

  function handleCustomerEmail() {
    axios
      .put(`/api/user/customer/email`, { nickName, password })
      .then(() => {
        // todo : 회원님의 이메일은 ...입니다 페이지로 이동
        navigate("/login");
        window.scrollTo({ top: 0, behavior: "auto" });
      })
      .catch((err) => {
        // todo : 에러메세지 수정하기
        if (err.response.status === 400) {
          errorToast("");
        } else if (err.response.status === 404) {
          errorToast("해당 닉네임으로 가입한 이력이 없습니다");
        } else errorToast("이메일 찾기에 실패하였습니다");
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
          <Text textColor={"pink"}>이메일 찾기</Text>
        </Box>
      </Box>
      <Center>
        <Box>
          <Center>
            <Box>
              <Center mt={10} fontSize={"lg"} fontWeight={"bold"}>
                <Text>고객 이메일 찾기</Text>
              </Center>
            </Box>
          </Center>
          <Box mt={8}>
            <FormControl>
              <FormLabel {...formLabel}>닉네임</FormLabel>
              <InputGroup width={"450px"}>
                <Input
                  placeholder={"닉네임을 입력하세요"}
                  sx={{ "::placeholder": { fontSize: "sm" } }}
                  onChange={(e) => setNickName(e.target.value)}
                />
              </InputGroup>
            </FormControl>
          </Box>
          <Box mt={6}>
            <FormControl>
              <FormLabel {...formLabel}>비밀번호</FormLabel>
              <InputGroup width={"450px"}>
                <Input
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={"비밀번호를 입력하세요"}
                  sx={{ "::placeholder": { fontSize: "sm" } }}
                  value={password}
                  type={"password"}
                />
              </InputGroup>
              <FormHelperText ml={1} color={"gray.500"} fontSize={"12px"}>
                ※ 영문 대/소문자, 숫자, 특수문자를 하나 이상 포함하여 8-20자
                이내로 입력하세요
              </FormHelperText>
            </FormControl>
          </Box>
          <Center mt={10}>
            <Button
              onClick={handleCustomerEmail}
              bg={"#444444"}
              color={"white"}
              width={"400px"}
              fontSize={"14px"}
              borderRadius={"40"}
              _hover={{ backgroundColor: "gray.500" }}
            >
              이메일 찾기
            </Button>
          </Center>
        </Box>
      </Center>
    </>
  );
}
