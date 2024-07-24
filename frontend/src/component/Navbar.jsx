import { Box, Flex, Spacer, Text, Center } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "./LoginProvider.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export function Navbar() {
  const account = useContext(LoginContext);
  const navigate = useNavigate();
  return (
    <Flex
      h={"40px"}
      fontSize={"lg"}
      align={"center"}
      justifyContent={"space-between"}
      backgroundColor={"yellow"}
    >
      <Box>
        <Center onClick={() => navigate("/")} cursor={"pointer"}>
          <Text>Home</Text>
        </Center>
      </Box>
      <Box>
        <Center onClick={() => navigate("/product")} cursor={"pointer"}>
          <Text>상품등록</Text>
        </Center>
      </Box>
      <Box>
        <Center onClick={() => navigate("/product/list")} cursor={"pointer"}>
          <Text>상품리스트</Text>
        </Center>
      </Box>
      <Spacer />

      {!account.isLoggedIn() ? (
        <>
          <Box onClick={() => navigate("/signup")} cursor={"pointer"} mr={"10"}>
            회원가입
          </Box>
          <Box
            marginRight="100px"
            onClick={() => navigate("/login")}
            cursor={"pointer"}
          >
            로그인
          </Box>
        </>
      ) : (
        <>
          <Box mr={10}>
            <FontAwesomeIcon icon={faUser} style={{ color: "#FFD43B" }} />
            &nbsp;
            {account.nickName}
            {account.branchName}
          </Box>
          <Box
            marginRight="100px"
            onClick={() => account.logout()}
            cursor={"pointer"}
          >
            로그아웃
          </Box>
        </>
      )}
    </Flex>
  );
}
