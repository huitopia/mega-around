import {
  Box,
  Center,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../component/LoginProvider.jsx";
import { CustomerList } from "./CustomerList.jsx";
import { BranchAdminList } from "./BranchAdminList.jsx";

export function MyPageAdmin() {
  const account = useContext(LoginContext);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (account.hasAuth() === "admin") {
      setIsAdmin(true);
    } else {
      alert("접근 권한이 없습니다");
    }
  }, [account]);

  if (!isAdmin) {
    return null; // 권한이 없는 경우 페이지를 렌더링하지 않음
  }

  return (
    <>
      <Box
        height={"280px"}
        backgroundColor={"#444444"}
        textAlign={"center"}
        display={"flex"}
        alignItems={"center"}
        justifyContent="center"
      >
        <Box>
          <Heading size="2xl" textColor={"#FDD000"}>
            MEGA AROUND
          </Heading>
          <Text textColor={"pink"}>전체 회원 정보</Text>
        </Box>
      </Box>
      <Center mt={10}>
        <Box w={700}>
          <Tabs>
            <TabList>
              <Tab>고객</Tab>
              <Tab>지점</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <p>
                  <CustomerList />
                </p>
              </TabPanel>
              <TabPanel>
                <p>
                  <BranchAdminList />
                </p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Center>
    </>
  );
}
