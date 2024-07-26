import { Box, Center, Spinner, Table, Td, Th, Tr } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../component/LoginProvider.jsx";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export function MyPageBranch() {
  const account = useContext(LoginContext);
  const [branch, setBranch] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(id);
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
                    <Td>{branch.email}</Td>
                  </Tr>
                  <Tr>
                    <Th>지점명</Th>
                    <Td>{branch.nickName}</Td>
                  </Tr>
                  <Tr>
                    <Th>주소</Th>
                    <Td>{branch.address}</Td>
                  </Tr>
                  <Tr>
                    <Th>가입일</Th>
                    <Td>{branch.createdAt}</Td>
                  </Tr>
                </Table>
              </Center>
            </>
          )}
        </Box>
      </Center>
    </>
  );
}
