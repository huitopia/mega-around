import {
  Box,
  Button,
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { CustomToast } from "./component/CustomToast.jsx";
import { LoginContext } from "./component/LoginProvider.jsx";
import ConfirmationModal from "./user/component/CustomModal.jsx";

export function CustomerEdit() {
  const [customer, setCustomer] = useState(null);
  const [oldNickName, setOldNickName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [isCheckedNickName, setIsCheckedNickName] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const account = useContext(LoginContext);
  const { successToast, errorToast, infoToast } = CustomToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    axios
      .get(`/api/user/customer/${account.id}`)
      .then((res) => {
        const dbCustomer = res.data;
        setCustomer({ ...dbCustomer });
        setOldNickName(dbCustomer.nickName);
      })
      .catch((err) => {
        if (err.response.status === 403) {
          alert("접근 권한이 없습니다.");
          navigate("/");
        } else {
          alert("해당 페이지가 없습니다.");
          navigate("/");
        }
      });
  }, []);

  const passwordPattern =
    /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,20}$/;

  useEffect(() => {
    if (customer && passwordPattern.test(customer.password)) {
      setIsValidPassword(true);
    } else {
      setIsValidPassword(false);
    }
  }, [customer, passwordPattern]);

  function handleCustomerUpdate() {
    setIsLoading(true);
    const customerCopy = { ...customer };
    axios
      .putForm(`/api/user/customer/${account.id}`, {
        ...customerCopy,
        oldPassword,
      })
      .then((res) => {
        account.logout();
        account.login(res.data.token);
        successToast("회원 정보가 수정되었습니다");
      })
      .catch((err) => {
        if (err.response.status === 401) {
          errorToast("비밀번호가 다릅니다");
        } else if (err.response.status === 400) {
          errorToast("사용할 수 없는 비밀번호이거나 닉네임입니다");
        } else {
          errorToast("회원 정보 수정 중 문제가 발생했습니다");
        }
      })
      .finally(() => {
        setOldPassword("");
        onClose();
        setIsLoading(false);
        navigate(`/mypage/customer/${customer.id}`);
      });
  }

  let isCheckedPassword = customer?.password === passwordCheck;

  // let disabledNickNameCheckButton = true;
  // let disabled = false;

  // if (customer?.nickName.length === 0) {
  //   disabledNickNameCheckButton = false;
  // }

  // if (!isCheckedNickName) {
  //   disabled = true;
  // }

  // if (!isCheckedPassword) {
  //   disabled = true;
  // }

  // if (!disabledNickNameCheckButton) {
  //   disabled = true;
  // }

  // if (!isValidPassword && customer?.password?.length > 0) {
  //   disabled = true;
  // }

  if (customer === null) {
    return <Spinner />;
  }

  function handleCustomerDelete() {
    axios.delete("/api/user/customer/${account.id}", account.id);
  }

  return (
    <>
      <Center>
        <Box w={520} mt={10}>
          <Center mt={5} mb={10} fontSize={"25px"} fontWeight={"bold"}>
            <Text>개인 회원정보 수정</Text>
          </Center>
          <Box>
            <Box mb={7}>
              <FormControl>
                <FormLabel>이메일</FormLabel>
                <Input value={customer.email} readOnly />
              </FormControl>
            </Box>
            <Box mb={7}>
              <FormControl isRequired>
                <FormLabel>새로운 비밀번호</FormLabel>
                <InputGroup>
                  <Input
                    type="password"
                    placeholder={"새 비밀번호를 입력해 주세요"}
                    sx={{ "::placeholder": { fontSize: "sm" } }}
                    onChange={(e) =>
                      setCustomer({ ...customer, password: e.target.value })
                    }
                  />
                  <InputRightElement>
                    {customer?.password?.length > 0 &&
                      (isValidPassword ? (
                        <CheckIcon color="green.500" />
                      ) : (
                        <CloseIcon color="red.500" />
                      ))}
                  </InputRightElement>
                </InputGroup>
                {customer?.password?.length > 0 &&
                  (isValidPassword || (
                    <FormHelperText color={"#dc7b84"}>
                      영문 대/소문자, 숫자, 특수문자를 하나 이상 포함하여 8-20자
                      이내로 입력해 주세요.
                    </FormHelperText>
                  ))}
              </FormControl>
            </Box>
            <Box mb={7}>
              <FormControl isRequired>
                <FormLabel>비밀번호 재입력</FormLabel>
                <InputGroup>
                  <Input
                    type="password"
                    onChange={(e) => setPasswordCheck(e.target.value)}
                    placeholder={"새 비밀번호를 다시 입력해 주세요"}
                    sx={{ "::placeholder": { fontSize: "sm" } }}
                  />
                  <InputRightElement>
                    {passwordCheck.length > 0 &&
                      (isCheckedPassword ? (
                        <CheckIcon color="green.500" />
                      ) : (
                        <CloseIcon color="red.500" />
                      ))}
                  </InputRightElement>
                </InputGroup>
                {passwordCheck.length > 0 &&
                  (isCheckedPassword || (
                    <FormHelperText color={"#dc7b84"}>
                      비밀번호가 일치하지 않습니다
                    </FormHelperText>
                  ))}
              </FormControl>
            </Box>
            <Box mb={7}>
              <FormControl isRequired>
                <FormLabel>닉네임</FormLabel>
                <InputGroup>
                  <Input
                    value={customer?.nickName || ""}
                    onChange={(e) => {
                      setCustomer({
                        ...customer,
                        nickName: e.target.value.trim(),
                      });
                      // setIsCheckedNickName(false);
                    }}
                  />
                </InputGroup>

                {/*{isCheckedNickName || (*/}
                {/*  <FormHelperText color={"#dc7b84"}>*/}
                {/*    중복된 닉네임입니다.*/}
                {/*  </FormHelperText>*/}
                {/*)}*/}
              </FormControl>
            </Box>

            {/*<Flex justifyContent={"space-between"} mt={10} alignItems={"end"}>*/}
            <Center mt={10}>
              <Button
                bg={"black"}
                color={"white"}
                width={"200px"}
                fontSize={"14px"}
                borderRadius={"40"}
                // isDisabled={disabled}
                onClick={onOpen}
              >
                수정
              </Button>
            </Center>

            <Box display="flex">
              <Box
                mt={3}
                fontSize="sm"
                ml={"auto"}
                cursor="pointer"
                as={"u"}
                color={"gray.500"}
                onClick={handleCustomerDelete}
              >
                회원탈퇴
              </Box>
            </Box>
          </Box>
        </Box>
      </Center>
      <ConfirmationModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleCustomerUpdate}
        isLoading={isLoading}
        setPassword={setOldPassword}
        modalheader={"수정하시겠습니까?"}
        modalbody={"비밀번호를 입력해주세요"}
      />
    </>
  );
}
