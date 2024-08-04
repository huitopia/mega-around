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
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Postcode } from "./component/Postcode.jsx";
import DeleteModal from "./component/DeleteModal.jsx";

export function EditBranch() {
  const [branch, setBranch] = useState({ password: "" });
  const [oldBranchName, setOldBranchName] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [disableBranchNameButton, setDisableBranchNameButton] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const account = useContext(LoginContext);
  const { successToast, errorToast, infoToast } = CustomToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    axios
      .get(`/api/user/branch/${account.id}`)
      .then((res) => {
        const dbBranch = res.data;
        setBranch({ ...dbBranch, password: "" });
        setOldBranchName(dbBranch.branchName);
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
    if (branch && passwordPattern.test(branch.password)) {
      setIsValidPassword(true);
    } else {
      setIsValidPassword(false);
    }
  }, [branch.password]);

  function handleBranchUpdate() {
    setIsLoading(true);
    const branchCopy = { ...branch };
    axios
      .put(`/api/user/branch/${account.id}`, {
        ...branchCopy,
      })
      .then((res) => {
        account.logout();
        account.login(res.data.token);
        successToast("지점 정보가 수정되었습니다");
        navigate(`/mypage/branch/${branch.id}`);
      })
      .catch((err) => {
        if (err.response.status === 400) {
          errorToast(err.response.data);
        } else {
          errorToast("지점 정보 수정 중 문제가 발생했습니다");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleBranchDelete() {
    setIsLoading(true);
    axios
      .delete(`/api/user/branch/${account.id}`)
      .then(() => {
        infoToast("탈퇴 되었습니다. 그동안 이용해 주셔서 감사합니다");
        account.logout();
        navigate("/");
        window.scrollTo({ top: 0, behavior: "auto" });
      })
      .catch(() => errorToast("지점 탈퇴 중 문제가 발생하였습니다"))
      .finally(() => {
        setIsLoading(false);
        onClose();
      });
  }

  let isCheckedPassword = branch.password === passwordCheck;

  if (branch === null) {
    return <Spinner />;
  }

  function handleBranchCheckBranchName() {
    axios
      .get(
        `/api/user/branch/branchName/${branch.branchName}`,
        branch.branchName,
      )
      .then(() => infoToast("사용 가능한 지점명입니다"))
      .catch((err) => {
        if (err.response.status === 409) {
          errorToast("이미 존재하는 지점명입니다");
        } else {
          errorToast("유효하지 않은 지점명입니다");
        }
      });
  }
  // 주소 선택 핸들러에서 branch 상태 업데이트
  const handleAddressSelect = (fullAddress) => {
    setBranch((prevBranch) => ({ ...prevBranch, address: fullAddress }));
  };

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
          <Text textColor={"pink"}>마이페이지</Text>
        </Box>
      </Box>
      <Center>
        <Box w={520} mt={10}>
          <Center mt={1} mb={8} fontSize={"25px"} fontWeight={"bold"}>
            <Text>지점 정보 수정</Text>
          </Center>
          <Box>
            <Box mb={7}>
              <FormControl isRequired>
                <FormLabel>이메일</FormLabel>
                <Input value={branch.email} readOnly />
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
                      setBranch({ ...branch, password: e.target.value })
                    }
                  />
                  <InputRightElement>
                    {branch.password.length === 0 ||
                      (isValidPassword ? (
                        <CheckIcon color="green.500" />
                      ) : (
                        <CloseIcon color="red.500" />
                      ))}
                  </InputRightElement>
                </InputGroup>
                {branch.password.length === 0 ||
                  (!isValidPassword && (
                    <FormHelperText color={"#dc7b84"} fontSize={"12px"}>
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
                    <FormHelperText color={"#dc7b84"} fontSize={"12px"}>
                      비밀번호가 일치하지 않습니다
                    </FormHelperText>
                  ))}
              </FormControl>
            </Box>
            <Box mb={7}>
              <FormControl isRequired>
                <FormLabel>지점명</FormLabel>
                <Flex>
                  <Input
                    value={branch.branchName}
                    onChange={(e) => {
                      setBranch({
                        ...branch,
                        branchName: e.target.value.trim(),
                      });
                      setDisableBranchNameButton(false);
                    }}
                  />
                  <Box w={5} />
                  <Button
                    isDisabled={
                      disableBranchNameButton ||
                      oldBranchName === branch.branchName
                    }
                    onClick={handleBranchCheckBranchName}
                    variant={"outline"}
                    colorScheme={"purple"}
                    fontSize={"sm"}
                    width={"150px"}
                    borderRadius={5}
                  >
                    중복확인
                  </Button>
                </Flex>
              </FormControl>
            </Box>
            <Box mb={7}>
              <FormControl isRequired>
                <FormLabel>주소</FormLabel>
                <Flex>
                  <Input value={branch.address} readOnly />
                  <Box w={5} />
                  <Postcode onAddressSelect={handleAddressSelect} />
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
                  branch.password.length > 0 &&
                  !isCheckedPassword &&
                  !isValidPassword
                }
                onClick={handleBranchUpdate}
                _hover={{ backgroundColor: "gray.600" }}
              >
                수정
              </Button>
            </Center>
            <Box display="flex">
              <Box
                mt={3}
                mb={5}
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
      <DeleteModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleBranchDelete}
        isLoading={isLoading}
      />
    </>
  );
}
