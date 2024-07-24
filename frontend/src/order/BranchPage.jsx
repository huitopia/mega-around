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
        <OrderManageComp stateId={0} branchId={1} text={"신규주문"}/>
        <OrderManageComp stateId={1} branchId={1} text={"제조중"}/>
        <OrderManageComp stateId={2} branchId={1} text={"제조완료"}/>
      </Box>
    </Box>
  );
}
