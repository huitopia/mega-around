import { Box, Flex, Spacer } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "./LoginProvider.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export function Navbar() {
  const account = useContext(LoginContext);
  const navigate = useNavigate();
  console.log(account);
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
