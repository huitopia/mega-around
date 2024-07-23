import { Box, Flex, Spacer } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "../LoginProvider.jsx";

export function Navbar() {
  const account = useContext(LoginContext);
  const navigate = useNavigate();
  return (
    <Flex
      h={"50px"}
      p={4}
      justifyContent="space-around"
      align="center"
      cursor={"pointer"}
      borderBottom={"1px solid black"}
    >
      <Box marginLeft="100px" onClick={() => navigate("/")} cursor={"pointer"}>
        Home
      </Box>
      <Spacer />
      <Box onClick={() => navigate("/signup")} cursor={"pointer"} mr={"10"}>
        회원가입
      </Box>
      {!account.isLoggedIn() ? (
        <Box
          marginRight="100px"
          onClick={() => navigate("/login")}
          cursor={"pointer"}
        >
          로그인
        </Box>
      ) : (
        <Box
          marginRight="100px"
          onClick={() => account.logout()}
          cursor={"pointer"}
        >
          로그아웃
        </Box>
      )}
    </Flex>
  );
}
