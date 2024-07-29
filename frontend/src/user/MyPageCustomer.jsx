import {
  Box,
  Center,
  Spinner,
  Table,
  Td,
  Th,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../component/LoginProvider.jsx";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmationModal from "../user/component/CustomModal.jsx";
import { CustomToast } from "../component/CustomToast.jsx";

export function MyPageCustomer() {
  const account = useContext(LoginContext);
  const [customer, setCustomer] = useState(null);
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
      .get(`/api/user/customer/${id}`, id)
      .then((res) => setCustomer(res.data))
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

  if (customer === null) {
    return (
      <Center mt={20}>
        <Spinner />
      </Center>
    );
  }

  function handleCustomerPasswordCheck() {
    setIsLoading(true);
    axios
      .post(`/api/user/customer/password/${id}`, { password })
      .then(() => navigate(`/mypage/customer/edit/${id}`))
      .catch((err) => {
        err.response.status === 401
          ? errorToast("비밀번호가 맞지 않습니다")
          : errorToast("비밀번호 확인 중 오류가 발생했습니다");
      })
      .finally(setIsLoading(false));
  }

  return (
    <>
      <Center mt={10}>
        <Box w={500}>
          {id === account.id && (
            <>
              <Center mt={5} mb={10} fontSize={"25px"} fontWeight={"bold"}>
                내 정보 확인
              </Center>
              <Center>
                <Table w={400}>
                  <Tr>
                    <Th>이메일</Th>
                    <Td>{customer.email}</Td>
                  </Tr>
                  <Tr>
                    <Th>닉네임</Th>
                    <Td>{customer.nickName}</Td>
                  </Tr>
                  <Tr>
                    <Th>가입일</Th>
                    <Td>{customer.createdAtTime}</Td>
                  </Tr>
                </Table>
              </Center>
              {/*<Link to={`/mypage/customer/edit/${id}`}>*/}
              <Box display="flex">
                <Box
                  mt={10}
                  fontSize="sm"
                  ml={"auto"}
                  mr={12}
                  cursor="pointer"
                  as={"u"}
                  color={"gray.500"}
                  onClick={onOpen}
                >
                  회원정보 수정
                </Box>
              </Box>
              {/*</Link>*/}
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
        onConfirm={handleCustomerPasswordCheck}
      />
    </>
  );
}
