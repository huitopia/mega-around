import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Input,
  Spinner,
} from "@chakra-ui/react";
import { OrderManageComp } from "./component/OrderManageComp.jsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CustomToast } from "../component/CustomToast.jsx";

export function BranchPage() {
  const [isChanged, setIsChanged] = useState(false);
  const { id } = useParams();
  const [date, setDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const { errorToast } = CustomToast();

  useEffect(() => {
    const now = new Date();
    const before = new Date(now);
    before.setHours(now.getHours() - 5);
    const formattedDate = now.toISOString().split("T")[0];
    const hours = now.getHours().toString().padStart(2, "0");
    const prevHours = before.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    setEndTime(`${hours}:${minutes}`);
    setStartTime(`${prevHours}:${minutes}`);
    setDate(formattedDate);
  }, [id]);

  if (date === null || startTime === null || endTime === null) {
    return <Spinner />;
  }

  function handleSetStartTime(value) {
    const selectedStartTime = new Date(`${date}T${value}:00`);
    const selectedEndTime = new Date(`${date}T${endTime}:00`);

    if (selectedStartTime >= selectedEndTime) {
      errorToast("시작 시간이 종료 시간보다 이후일 수 없습니다.");
    } else {
      setStartTime(value);
    }
  }

  function handleSetEndTime(value) {
    const selectedStartTime = new Date(`${date}T${startTime}:00`);
    const selectedEndTime = new Date(`${date}T${value}:00`);

    if (selectedStartTime >= selectedEndTime) {
      errorToast("종료 시간이 시작 시간보다 이전일 수 없습니다.");
    } else {
      setEndTime(value);
    }
  }

  return (
    <Box mx={"auto"}>
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
            BRANCH PAGE
          </Heading>
        </Box>
      </Box>
      <Box mt={10}>
        <Center>
          <Flex gap={3} px={3} mb={10}>
            <Input
              w={"500px"}
              type={"date"}
              value={date}
              onChange={(event) => {
                setDate(event.target.value);
              }}
            />
            <Input
              w={"200px"}
              type={"time"}
              step={60}
              value={startTime}
              onChange={(event) => handleSetStartTime(event.target.value)}
            />
            <Input
              w={"200px"}
              type={"time"}
              step={60}
              value={endTime}
              onChange={(event) => handleSetEndTime(event.target.value)}
            />
            <Button colorScheme={"orange"} onClick={() => setIsChanged(true)}>
              조회
            </Button>
          </Flex>
        </Center>
        <Center>
          <Box>
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
        </Center>
      </Box>
    </Box>
  );
}
