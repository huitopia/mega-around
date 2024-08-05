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
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { CustomToast } from "../component/CustomToast.jsx";
import { formLabel } from "../component/css/style.js";
import { useNavigate } from "react-router-dom";

export function FindBranchEmail() {
  const [email, setEmail] = useState("");
  const [branchName, setBranchName] = useState("");
  const [password, setPassword] = useState("");
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { successToast, errorToast, infoToast } = CustomToast();
  const navigate = useNavigate();

  function handleBranchEmail() {
    axios
      .post(`/api/user/branch/email`, { branchName, password })
      .then((res) => {
        window.scrollTo({ top: 0, behavior: "auto" });
        setEmail(res.data.email);
        onOpen();
      })
      .catch((err) => {
        if (err.response.status === 401 || err.response.status === 404) {
          errorToast(err.response.data);
        } else errorToast("이메일 찾기를 실패하였습니다");
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
                <Text>지점 이메일 찾기</Text>
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
                  onChange={(e) => setBranchName(e.target.value)}
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
              onClick={handleBranchEmail}
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

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>이메일 확인</ModalHeader>
          <ModalBody pb={8} pt={8} ml={7}>
            <Text>
              회원님의 이메일은{" "}
              <Text as="span" fontWeight="bold">
                {email}
              </Text>{" "}
              입니다.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button
              mr={2}
              onClick={() => {
                onClose();
                navigate("/login/branch");
              }}
              colorScheme="orange"
              width={"100px"}
            >
              확인
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
