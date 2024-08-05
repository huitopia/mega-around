import {
  Box,
  Center,
  Heading,
  Spinner,
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
import { useNavigate } from "react-router-dom";

export function MyPageAdmin() {
  const account = useContext(LoginContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const [isCustomer, setIsCustomer] = useState(true);
  const [isBranch, setIsBranch] = useState(false);

  useEffect(() => {
    if (account.hasAuth() === "admin") {
      setIsAdmin(true);
    } else {
      alert("접근 권한이 없습니다");
      navigate("/"); // 권한이 없는 경우 메인 페이지로 리디렉션
    }
  }, [account, isAdmin]);

  if (account === null) {
    // 권한 확인 중일 때 로딩 상태를 표시합니다.
    return (
      <Center height="100vh">
        <Spinner size="xl" />
      </Center>
    );
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
        <Box w={900}>
          <Tabs>
            <TabList>
              <Tab>고객</Tab>
              <Tab>지점</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Box>
                  <CustomerList />
                </Box>
              </TabPanel>
              <TabPanel>
                <Box>
                  <BranchAdminList />
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Center>
    </>
  );
}
