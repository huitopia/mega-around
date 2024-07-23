import { Box, Flex, Spacer } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function Navbar() {
  const navigate = useNavigate();
  return (
    <Flex>
      <Box
        backgroundColor={"yellow"}
        onClick={() => navigate("/")}
        cursor={"pointer"}
      >
        Home
      </Box>
      <Box
        backgroundColor={"beige"}
        onClick={() => navigate("/signup")}
        cursor={"pointer"}
      >
        회원가입
      </Box>
      <Spacer />
      <Box onClick={() => navigate("/login")} cursor={"pointer"}>
        로그인
      </Box>
      <Box
        ml={8}
        onClick={() => localStorage.removeItem("token")}
        cursor={"pointer"}
      >
        로그아웃
      </Box>
    </Flex>
  );
}
