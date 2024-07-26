import { Box, Center, Spinner, Table, Td, Th, Tr } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../component/LoginProvider.jsx";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export function MyPageCustomer() {
  const account = useContext(LoginContext);
  const [customer, setCustomer] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(id);
  console.log("customer 값 = ", customer);
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
      <Center>
        <Spinner />
      </Center>
    );
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
                  {account.hasAuth() === "branch" && (
                    <Tr>
                      <Th>주소</Th>
                      <Td>ㅁㅁ</Td>
                    </Tr>
                  )}
                </Table>
              </Center>
            </>
          )}
        </Box>
      </Center>
    </>
  );
}
