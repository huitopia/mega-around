import {
  Box,
  Divider,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useState } from "react";
import { OrderListPanel } from "./component/OrderListPanel.jsx";

export function OrderList() {
  const [period, setPeriod] = useState("week");

  return (
    <Box maxWidth="1000px" mx={"auto"}>
      <Box>
        <Heading>Order List</Heading>
      </Box>
      <Divider border={"1px solid black"} my={4} />
      <Tabs isFitted variant="soft-rounded" colorScheme="red">
        <TabList mb="1em">
          <Tab onClick={() => setPeriod("week")}>1주일</Tab>
          <Tab onClick={() => setPeriod("month")}>1개월</Tab>
          <Tab onClick={() => setPeriod("3-month")}>3개월</Tab>
          <Tab onClick={() => setPeriod("all")}>전체</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>{<OrderListPanel period={period} />}</TabPanel>
          <TabPanel>{<OrderListPanel period={period} />}</TabPanel>
          <TabPanel>{<OrderListPanel period={period} />}</TabPanel>
          <TabPanel>{<OrderListPanel period={period} />}</TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
