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
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomToast } from "../component/CustomToast.jsx";
import { formLabel } from "../component/css/style.js";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

export function FindBranchPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(false);
  const navigate = useNavigate();
  const { successToast, errorToast, infoToast } = CustomToast();
  function handleBranchPassword() {
    axios
      .put(`/api/user/branch/password`, { email, password })
      .then(() => {
        successToast(`비밀번호가 재설정 되었습니다`);
        navigate("/login/branch");
        window.scrollTo({ top: 0, behavior: "auto" });
      })
      .catch((err) => {
        if (err.response.status === 400) {
          errorToast("비밀번호 패턴이 맞지 않습니다");
        } else if (err.response.status === 404) {
          errorToast("가입 한 이메일이 없습니다");
        } else errorToast("비밀번호 재설정에 실패하였습니다");
      });
  }

  const passwordPattern =
    /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,20}$/;
  useEffect(() => {
    if (passwordPattern.test(password)) {
      setIsValidPassword(true);
    } else {
      setIsValidPassword(false);
    }
  }, [password, passwordPattern]);

  let isCheckedPassword;
  if (password === passwordCheck) {
    isCheckedPassword = true;
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
                <Text>지점 비밀번호 재설정</Text>
              </Center>
            </Box>
          </Center>
          <Box mt={8}>
            <FormControl>
              <FormLabel {...formLabel}>이메일</FormLabel>
              <InputGroup width={"450px"}>
                <Input
                  placeholder={"이메일을 입력하세요"}
                  sx={{ "::placeholder": { fontSize: "sm" } }}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </InputGroup>
            </FormControl>
          </Box>
          <Box mt={6}>
            <FormControl isRequired>
              <FormLabel {...formLabel}>재설정 비밀번호</FormLabel>
              <InputGroup width={"450px"}>
                <Input
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={"재설정 할 비밀번호를 입력하세요"}
                  sx={{ "::placeholder": { fontSize: "sm" } }}
                  value={password}
                  type={"password"}
                />
                <InputRightElement>
                  {password.length > 0 &&
                    (isValidPassword ? <CheckIcon /> : <CloseIcon />)}
                </InputRightElement>
              </InputGroup>
              {password.length > 0 &&
                (isValidPassword || (
                  <FormHelperText color={"#dc7b84"} fontSize={"12px"}>
                    영문 대/소문자, 숫자, 특수문자를 하나 이상 포함하여 8-20자
                    이내로 입력해 주세요.
                  </FormHelperText>
                ))}
            </FormControl>
          </Box>
          <Box mb={7} mt={6}>
            <FormControl isRequired>
              <FormLabel {...formLabel}>비밀번호 재입력</FormLabel>
              <InputGroup>
                <Input
                  type="password"
                  onChange={(e) => setPasswordCheck(e.target.value)}
                  placeholder={"비밀번호를 한번 더 입력해주세요"}
                  sx={{ "::placeholder": { fontSize: "sm" } }}
                  maxWidth={"450px"}
                />
                <InputRightElement>
                  {passwordCheck.length > 0 &&
                    (isCheckedPassword ? <CheckIcon /> : <CloseIcon />)}
                </InputRightElement>
              </InputGroup>
              {passwordCheck.length > 0 &&
                (isCheckedPassword || (
                  <FormHelperText color={"#dc7b84"} fontSize={"12px"}>
                    비밀번호가 일치하지 않습니다
                  </FormHelperText>
                ))}
            </FormControl>
          </Box>
          <Center mt={10}>
            <Button
              onClick={handleBranchPassword}
              bg={"#444444"}
              color={"white"}
              width={"400px"}
              fontSize={"14px"}
              borderRadius={"40"}
              _hover={{ backgroundColor: "gray.500" }}
              isDisabled={!isValidPassword || !isCheckedPassword}
            >
              비밀번호 재설정
            </Button>
          </Center>
        </Box>
      </Center>
    </>
  );
}
