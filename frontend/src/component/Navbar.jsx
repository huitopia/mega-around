import { Box, Center, Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { LoginContext } from "./LoginProvider.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import MyPageMenu from "./MyPageMenu.jsx";

export function Navbar() {
  const account = useContext(LoginContext);
  const navigate = useNavigate();
  const [showTabs, setShowTabs] = useState(false);
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
      {!account.isLoggedIn() ? (
        <>
          <Box onClick={() => navigate("/signup")} cursor={"pointer"}>
            회원가입
          </Box>
          <Box onClick={() => navigate("/login")} cursor={"pointer"}>
            로그인
          </Box>
        </>
      ) : (
        <>
          <Box mr={10} onMouseOver={() => setShowTabs(true)}>
            <FontAwesomeIcon icon={faUser} style={{ color: "darkolivegreen" }} />
            &nbsp;
            {account.nickName}
            {account.branchName}
          </Box>
          {showTabs && <MyPageMenu />}
          <Box onClick={() => account.logout()} cursor={"pointer"}>
            로그아웃
          </Box>
        </>
      )}
    </Flex>
  );
}
