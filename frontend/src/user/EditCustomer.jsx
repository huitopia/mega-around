import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { CustomToast } from "../component/CustomToast.jsx";
import { LoginContext } from "../component/LoginProvider.jsx";
import ConfirmationModal from "./component/CustomModal.jsx";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function EditCustomer() {
  const [customer, setCustomer] = useState({ password: "" });
  const [oldNickName, setOldNickName] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [disableNickNameButton, setDisableNickNameButton] = useState(true);
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
        setCustomer({ ...dbCustomer, password: "" });
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
  }, [customer.password]);

  function handleCustomerUpdate() {
    setIsLoading(true);
    const customerCopy = { ...customer };
    axios
      .put(`/api/user/customer/${account.id}`, {
        ...customerCopy,
      })
      .then((res) => {
        account.logout();
        account.login(res.data.token);
        successToast("회원 정보가 수정되었습니다");
        navigate(`/mypage/customer/${customer.id}`);
      })
      .catch((err) => {
        if (err.response.status === 400) {
          errorToast(err.response.data);
        } else {
          errorToast("회원 정보 수정 중 문제가 발생했습니다");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCustomerDelete() {
    setIsLoading(true);
    axios
      .delete(`/api/user/customer/${account.id}`)
      .then(() => {
        infoToast("탈퇴 되었습니다. 그동안 이용해 주셔서 감사합니다");
      })
      .catch(() => errorToast("회원 탈퇴 중 문제가 발생하였습니다"))
      .finally(() => setIsLoading(false));
  }

  let isCheckedPassword = customer.password === passwordCheck;

  if (customer === null) {
    return <Spinner />;
  }

  function handleCustomerCheckNickName() {
    axios
      .get(
        `/api/user/customer/nickName/${customer.nickName}`,
        customer.nickName,
      )
      .then(() => infoToast("사용 가능한 닉네임입니다"))
      .catch((err) => {
        if (err.response.status === 409) {
          errorToast("이미 존재하는 닉네임입니다");
        } else {
          errorToast("유효하지 않은 닉네임입니다");
        }
      });
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
              <FormControl>
                <FormLabel>
                  새 비밀번호{" "}
                  <Tooltip
                    hasArrow
                    label="비밀번호 변경 시에만 입력해주세요"
                    placement="right"
                    closeDelay={1000}
                  >
                    <FontAwesomeIcon
                      icon={faCircleInfo}
                      style={{ color: "#638097" }}
                    />
                  </Tooltip>
                </FormLabel>
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
                    {customer.password.length === 0 ||
                      (isValidPassword ? (
                        <CheckIcon color="green.500" />
                      ) : (
                        <CloseIcon color="red.500" />
                      ))}
                  </InputRightElement>
                </InputGroup>
                {customer.password.length === 0 ||
                  (!isValidPassword && (
                    <FormHelperText color={"#dc7b84"}>
                      영문 대/소문자, 숫자, 특수문자를 하나 이상 포함하여 8-20자
                      이내로 입력해 주세요.
                    </FormHelperText>
                  ))}
              </FormControl>
            </Box>
            <Box mb={7}>
              <FormControl>
                <FormLabel>새 비밀번호 확인</FormLabel>
                <InputGroup>
                  <Input
                    type="password"
                    onChange={(e) => setPasswordCheck(e.target.value)}
                    placeholder={"새 비밀번호를 다시 입력해 주세요"}
                    sx={{ "::placeholder": { fontSize: "sm" } }}
                    value={passwordCheck}
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
              <FormControl>
                <FormLabel>닉네임</FormLabel>
                <Flex>
                  <Input
                    value={customer.nickName}
                    onChange={(e) => {
                      setCustomer({
                        ...customer,
                        nickName: e.target.value.trim(),
                      });
                      setDisableNickNameButton(false);
                    }}
                  />
                  <Box w={5} />
                  <Button
                    isDisabled={
                      disableNickNameButton || oldNickName === customer.nickName
                    }
                    onClick={handleCustomerCheckNickName}
                    variant={"outline"}
                    colorScheme={"purple"}
                    fontSize={"sm"}
                    width={"120px"}
                    borderRadius={5}
                  >
                    중복확인
                  </Button>
                </Flex>
              </FormControl>
            </Box>
            <Center mt={10}>
              <Button
                bg={"black"}
                color={"white"}
                width={"200px"}
                fontSize={"14px"}
                borderRadius={"40"}
                isDisabled={
                  customer.password.length > 0 &&
                  !isCheckedPassword &&
                  !isValidPassword
                }
                onClick={handleCustomerUpdate}
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
                onClick={onOpen}
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
        onConfirm={handleCustomerDelete}
        isLoading={isLoading}
        modalheader={" 확인요청 "}
        modalbody={"정말로 탈퇴하시겠습니까?"}
      />
    </>
  );
}
