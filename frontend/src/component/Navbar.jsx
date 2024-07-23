import { Box, Flex } from "@chakra-ui/react";
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
      <Box onClick={() => navigate("/login")} cursor={"pointer"}>
        로그인
      </Box>
    </Flex>
  );
}
