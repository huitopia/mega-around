import { Box, Divider, Heading } from "@chakra-ui/react";
import { OrderManageComp } from "./component/OrderManageComp.jsx";
import { useState } from "react";

export function BranchPage() {
  const [isChanged, setIsChanged] = useState(false);

  const branchId = 3;

  return (
    <Box maxWidth="1000px" mx={"auto"}>
      <Box>
        <Heading>Branch Page</Heading>
      </Box>
      <Divider border={"1px solid black"} my={4} />
      <Box>
        <OrderManageComp
          stateId={1}
          branchId={branchId}
          text={"신규주문"}
          isChanged={isChanged}
          setIsChanged={setIsChanged}
        />
        <OrderManageComp
          stateId={2}
          branchId={branchId}
          text={"제조중"}
          isChanged={isChanged}
          setIsChanged={setIsChanged}
        />
        <OrderManageComp
          stateId={3}
          branchId={branchId}
          text={"제조완료"}
          isChanged={isChanged}
          setIsChanged={setIsChanged}
        />
      </Box>
    </Box>
  );
}
