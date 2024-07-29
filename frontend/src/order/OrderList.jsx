import {
  Box,
  Divider,
  Heading,
  Tab, TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useState } from "react";
import { OrderListPanel } from "./component/OrderListPanel.jsx";

export function OrderList() {

  return (
    <Box maxWidth="1000px" mx={"auto"}>
      <Box>
        <Heading>Order List</Heading>
      </Box>
      <Divider border={"1px solid black"} my={4} />
      <Tabs isFitted variant="enclosed" colorScheme="red">
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
  );
}
