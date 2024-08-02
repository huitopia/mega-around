import {Box, Button, Center, Divider, Flex, Heading, Input, Spinner} from "@chakra-ui/react";
import { OrderManageComp } from "./component/OrderManageComp.jsx";
import {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import {CustomToast} from "../component/CustomToast.jsx";

export function BranchPage() {
  const [isChanged, setIsChanged] = useState(false);
  const { id } = useParams();
  const [date, setDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const {errorToast} = CustomToast();

  useEffect(() => {
    const now = new Date();
    const before = new Date(now);
    before.setHours(now.getHours() - 12);
    const formattedDate = now.toISOString().split('T')[0];
    const hours = now.getHours().toString().padStart(2, '0');
    const prevHours = before.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    setEndTime(`${hours}:${minutes}`);
    setStartTime(`${prevHours}:${minutes}`);
    setDate(formattedDate);
  }, [id]);


  useEffect(() => {
    if (startTime && endTime) {

    }
  }, [startTime, endTime]);

  if (date === null || startTime === null || endTime === null) {
    return <Spinner/>
  }

  return (
    <Box mx={"auto"}>
      <Box mt={"50px"} mb={"50px"}>
        <Center>
          <Heading>Branch Page</Heading>
        </Center>
      </Box>
      <Divider border={"1px solid black"} my={4} />
      <Box>
        <Center>
        <Flex gap={3} px={3} mb={10}>
          <Input w={"500px"} type={"date"} value={date} onChange={event => setDate(event.target.value)}/>
          <Input w={"200px"} type={"time"} step={60} value={startTime} onChange={(event) => setStartTime(event.target.value)}/>
          <Input w={"200px"} type={"time"} step={60} value={endTime} onChange={event => setEndTime(event.target.value)}/>
          <Button colorScheme={"orange"} onClick={() => setIsChanged(true)}>조회</Button>
        </Flex>
        </Center>
        <OrderManageComp
          stateId={1}
          branchId={id}
          text={"신규주문"}
          isChanged={isChanged}
          setIsChanged={setIsChanged}
          date={date}
          startTime={startTime}
          endTime={endTime}
        />
        <OrderManageComp
          stateId={2}
          branchId={id}
          text={"제조중"}
          isChanged={isChanged}
          setIsChanged={setIsChanged}
          date={date}
          startTime={startTime}
          endTime={endTime}
        />
        <OrderManageComp
          stateId={3}
          branchId={id}
          text={"제조완료"}
          isChanged={isChanged}
          setIsChanged={setIsChanged}
          date={date}
          startTime={startTime}
          endTime={endTime}
        />
      </Box>
    </Box>
  );
}
