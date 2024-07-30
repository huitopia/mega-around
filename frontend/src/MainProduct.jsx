import { Box, Center } from "@chakra-ui/react";
import { useContext } from "react";
import { LoginContext } from "./component/LoginProvider.jsx";
import SimpleSlider from "./component/SimpleSlider.jsx";

export function MainProduct() {
  const account = useContext(LoginContext);
  return (
    <>
      <SimpleSlider />
      <Center p={20} flexDirection={"column"}>
        {account.isLoggedIn() && (
          <Box fontWeight={"bold"}>
            {account.nickName}
            {account.branchName}&nbsp;님
          </Box>
        )}
        <Box mt={5}>메가 어라운드 메인페이지입니다.</Box>
      </Center>
    </>
  );
}
