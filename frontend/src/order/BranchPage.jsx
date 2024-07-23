import { Box, Divider, Heading } from "@chakra-ui/react";
import { OrderManageComp } from "./component/OrderManageComp.jsx";

export function BranchPage() {
  return (
    <Box maxWidth="1000px" mx={"auto"}>
      <Box>
        <Heading>Branch Page</Heading>
      </Box>
      <Divider border={"1px solid black"} my={4} />
      <Box>
        <OrderManageComp />
        <OrderManageComp />
        <OrderManageComp />
      </Box>
    </Box>
  );
}
