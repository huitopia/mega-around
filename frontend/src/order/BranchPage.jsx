import { Box, Center, Divider, Heading } from "@chakra-ui/react";
import { OrderManageComp } from "./component/OrderManageComp.jsx";
import { useState } from "react";
import { useParams } from "react-router-dom";

export function BranchPage() {
  const [isChanged, setIsChanged] = useState(false);
  const { id } = useParams();

  return (
    <Box mx={"auto"}>
      <Box mt={"50px"} mb={"50px"}>
        <Center>
          <Heading>Branch Page</Heading>
        </Center>
      </Box>
      <Divider border={"1px solid black"} my={4} />
      <Box>
        <OrderManageComp
          stateId={1}
          branchId={id}
          text={"신규주문"}
          isChanged={isChanged}
          setIsChanged={setIsChanged}
        />
        <OrderManageComp
          stateId={2}
          branchId={id}
          text={"제조중"}
          isChanged={isChanged}
          setIsChanged={setIsChanged}
        />
        <OrderManageComp
          stateId={3}
          branchId={id}
          text={"제조완료"}
          isChanged={isChanged}
          setIsChanged={setIsChanged}
        />
      </Box>
    </Box>
  );
}
