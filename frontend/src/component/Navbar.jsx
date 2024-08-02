import { Box, Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { LoginContext } from "./LoginProvider.jsx";
import MyPageMenu from "./MyPageMenu.jsx";

export function Navbar({ updateAlarm }) {
  const account = useContext(LoginContext);
  const navigate = useNavigate();
  // const [showTabs, setShowTabs] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  return (
    <Flex
      position="fixed"
      top={0}
      width="100%"
      height={"80px"}
      fontSize={"md"}
      textAlign={"center"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-around"}
      p={"30px"}
      zIndex={2}
      backgroundColor={"white"}
      borderBottom={"1px solid #444444"}
    >
      <Box onClick={() => navigate("/")} cursor={"pointer"}>
        <Text as={"b"} fontSize={"2xl"}>
          MEGA AROUND
        </Text>
      </Box>
      <Box onClick={() => navigate("branch/list")} cursor={"pointer"}>
        <Text>MEGA ORDER</Text>
      </Box>
      {!account.isLoggedIn() ? (
        <>
          <Box>
            <Flex gap={2}>
              <Box onClick={() => navigate("/signup")} cursor={"pointer"}>
                SIGNUP
              </Box>
              <Box>/</Box>
              <Box onClick={() => navigate("/login")} cursor={"pointer"}>
                LOGIN
              </Box>
            </Flex>
          </Box>
        </>
      ) : (
        <>
          {/*<Box mr={10} onMouseOver={() => setShowTabs(true)}>*/}
          {/*{account.nickName}*/}
          {/*{account.branchName}&nbsp;님*/}
          {/*</Box>*/}
          {/*{showTabs && <MyPageMenu />}*/}
          <Box>
            <MyPageMenu
              isChanged={isChanged}
              setIsChanged={setIsChanged}
              updateAlarm={updateAlarm}
            />
          </Box>
        </>
      )}
    </Flex>
  );
}
