import {
  Box,
  Center,
  Divider,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs, Text,
} from "@chakra-ui/react";
import { OrderListPanel } from "./component/OrderListPanel.jsx";

export function OrderList() {
  return (
    <Box>
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
            ORDER LIST
          </Heading>
        </Box>
      </Box>
      <Box  maxWidth="1000px" mx={"auto"} mt={10}>
      <Tabs isFitted variant="enclosed" colorScheme="#401F02">
        <TabList mb="1em">
          <Tab>1주일</Tab>
          <Tab>1개월</Tab>
          <Tab>3개월</Tab>
          <Tab>전체</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>{<OrderListPanel period={"week"} />}</TabPanel>
          <TabPanel>{<OrderListPanel period={"month"} />}</TabPanel>
          <TabPanel>{<OrderListPanel period={"3-month"} />}</TabPanel>
          <TabPanel>{<OrderListPanel period={"all"} />}</TabPanel>
        </TabPanels>
      </Tabs>
      </Box>
    </Box>
  );
}
