import { Box, Center, Flex, Spacer, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { LoginContext } from "./LoginProvider.jsx";
import MyPageMenu from "./MyPageMenu.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export function Navbar({ updateAlarm }) {
  const account = useContext(LoginContext);
  const navigate = useNavigate();
  // const [showTabs, setShowTabs] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  return (
    <Flex
      height={"80px"}
      fontSize={"md"}
      align={"center"}
      justifyContent={"space-between"}
      p={"30px"}
    >
      <Box>
        <Center onClick={() => navigate("/")} cursor={"pointer"}>
          <Text>HOME</Text>
        </Center>
      </Box>
      <Box>
        <Center onClick={() => navigate("branch/list")} cursor={"pointer"}>
          <Text>MEGA ORDER</Text>
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
          {/*<Box mr={10} onMouseOver={() => setShowTabs(true)}>*/}
          {/*{account.nickName}*/}
          {/*{account.branchName}&nbsp;님*/}
          {/*</Box>*/}
          {/*{showTabs && <MyPageMenu />}*/}
          <Spacer />
          <Box mr={"50px"}>
            <MyPageMenu setIsChanged={setIsChanged} updateAlarm={updateAlarm} />
          </Box>
          <Box
            onClick={() => {
              account.logout();
              navigate("/");
            }}
            cursor={"pointer"}
          >
            <FontAwesomeIcon icon={faRightFromBracket} />
          </Box>
        </>
      )}
    </Flex>
  );
}
