import { Box, Center, Table, Td, Th, Tr } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { LoginContext } from "./component/LoginProvider.jsx";
import axios from "axios";

export function MyPage() {
  const account = useContext(LoginContext);
  useEffect(() => {
    axios.get("/api/user/customer");
  }, []);
  return (
    <>
      <Center mt={10}>
        <Box w={500}>
          <Center mt={5} mb={10} fontSize={"25px"} fontWeight={"bold"}>
            내 정보 확인
          </Center>
          <Center>
            <Table w={400}>
              <Tr>
                <Th>이메일</Th>
                <Td>joo@naver.com</Td>
              </Tr>
              <Tr>
                <Th>닉네임</Th>
                <Td>안녕</Td>
              </Tr>
              {account.hasAuth() == "branch" && (
                <Tr>
                  <Th>주소</Th>
                  <Td>ㅁㅁ</Td>
                </Tr>
              )}
            </Table>
          </Center>
        </Box>
      </Center>
    </>
  );
}
