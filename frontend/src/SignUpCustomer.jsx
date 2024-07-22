import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function SignUpCustomer() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
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
      <Center>
        <Box w={500}>
          <Flex mb={10} justifyContent={"space-between"}>
            <Heading>고객 회원 가입</Heading>
            <Button
              colorScheme={"teal"}
              borderRadius={"unset"}
              variant={"outline"}
              onClick={() => navigate("/signup/branch")}
            >
              지점 회원가입
            </Button>
          </Flex>
          <Box>
            <Box mb={7}>
              <FormControl>
                <FormLabel>이메일</FormLabel>
                <InputGroup>
                  <Input
                    type={"email"}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      // setIsCheckedEmail(false);
                      // setIsValidEmail(!e.target.validity.typeMismatch);
                    }}
                  />
                  <InputRightElement w={"75px"} mr={1}>
                    <Button
                      // isDisabled={!isValidEmail || email.trim().length == 0}
                      // onClick={handleCheckEmail}
                      size={"sm"}
                    >
                      중복확인
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {/*{isCheckedEmail || (*/}
                {/*  <FormHelperText>이메일 중복확인을 해주세요.</FormHelperText>*/}
                {/*)}*/}
                {/*{isValidEmail || (*/}
                {/*  <FormHelperText>*/}
                {/*올바른 이메일 형식으로 작성해 주세요.*/}
                {/*</FormHelperText>*/}
                {/*)}*/}
              </FormControl>
            </Box>
            <Box mb={7}>
              <FormControl>
                <FormLabel>비밀번호</FormLabel>
                <Input onChange={(e) => setPassword(e.target.value)} />
              </FormControl>
            </Box>
            <Box mb={7}>
              <FormControl>
                <FormLabel>비밀번호 중복확인</FormLabel>
                <Input onChange={(e) => setPasswordCheck(e.target.value)} />
                {password === passwordCheck || (
                  <FormHelperText>암호가 일치하지 않습니다.</FormHelperText>
                )}
              </FormControl>
            </Box>
            <Box mb={7}>
              <FormControl>
                <FormLabel>닉네임</FormLabel>
                <InputGroup>
                  <Input
                    value={nickName}
                    onChange={(e) => {
                      setNickName(e.target.value.trim());
                      // setIsCheckedNickName(false);
                    }}
                  />
                  <InputRightElement w={"75px"} mr={1}>
                    <Button
                      isDisabled={nickName.trim().length == 0}
                      size={"sm"}
                      // onClick={handleCheckNickName}
                    >
                      중복확인
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {/*{isCheckedNickName || (*/}
                {/*  <FormHelperText>별명 중복확인을 해주세요.</FormHelperText>*/}
                {/*)}*/}
              </FormControl>
            </Box>
            <Box mb={7}>
              <Button
                // isLoading={isLoading}
                colorScheme={"blue"}
                // isDisabled={isDisabled}
                onClick={handleSignup}
              >
                가입
              </Button>
            </Box>
          </Box>
        </Box>
      </Center>
    </>
  );
}
