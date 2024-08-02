import {
  Box,
  Center,
  Heading,
  Spinner,
  Table,
  Td,
  Text,
  Th,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../component/LoginProvider.jsx";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmationModal from "./component/ConfirmationModal.jsx";
import { CustomToast } from "../component/CustomToast.jsx";

export function MyPageBranch() {
  const account = useContext(LoginContext);
  const [branch, setBranch] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { successToast, errorToast, infoToast } = CustomToast();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      return navigate("/login");
    }
    axios
      .get(`/api/user/branch/${id}`, id)
      .then((res) => setBranch(res.data))
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

  if (branch === null) {
    return (
      <Center mt={20}>
        <Spinner />
      </Center>
    );
  }

  function handleBranchPasswordCheck() {
    setIsLoading(true);
    axios
      .post(`/api/user/branch/password/${id}`, { password })
      .then(() => navigate(`/mypage/branch/edit/${id}`))
      .catch((err) => {
        err.response.status === 401
          ? errorToast("비밀번호가 맞지 않습니다")
          : errorToast("비밀번호 확인 중 오류가 발생했습니다");
      })
      .finally(setIsLoading(false));
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
          <Text textColor={"pink"}>마이페이지</Text>
        </Box>
      </Box>
      <Center mt={10}>
        <Box w={500}>
          {id === account.id && (
            <>
              <Center mt={1} mb={8} fontSize={"25px"} fontWeight={"bold"}>
                내 정보 확인
              </Center>
              <Center>
                <Table w={400}>
                  <Tr>
                    <Th>이메일</Th>
                    <Td>{branch.email}</Td>
                  </Tr>
                  <Tr>
                    <Th>지점명</Th>
                    <Td>{branch.branchName}</Td>
                  </Tr>
                  <Tr>
                    <Th>주소</Th>
                    <Td>{branch.address}</Td>
                  </Tr>
                  <Tr>
                    <Th>가입일</Th>
                    <Td>{branch.createdAtTime}</Td>
                  </Tr>
                </Table>
              </Center>
              <Box display="flex">
                <Box
                  mt={5}
                  fontSize="sm"
                  ml={"auto"}
                  mr={12}
                  cursor="pointer"
                  as={"u"}
                  color={"gray.500"}
                  onClick={onOpen}
                >
                  지점정보 수정
                </Box>
              </Box>
            </>
          )}
        </Box>
      </Center>
      <ConfirmationModal
        modalheader={"본인 확인"}
        modalbody={"비밀번호를 입력해주세요"}
        isOpen={isOpen}
        onClose={onClose}
        setPassword={setPassword}
        isLoading={isLoading}
        onConfirm={handleBranchPasswordCheck}
      />
    </>
  );
}
