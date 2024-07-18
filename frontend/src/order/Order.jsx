import {Box, Flex, FormControl, FormLabel, Input, Radio, Spacer, Stack} from "@chakra-ui/react";
import {useEffect} from "react";

export function Order() {
  useEffect(() => {

  }, []);

  return (<Box>
    <Box>주문하기</Box>
    <Box bg={"black"} color={"white"}>이대역사거리점</Box>
    <Flex>
      <Box>주문 상품</Box>
      <Spacer/>
      <Box>지구멜론 스무디</Box>
    </Flex>
    <Box>
      <FormControl>
        <FormLabel>매장 요청사항</FormLabel>
        <Input placeholder={"매장 요청사항이 있으면 적어주세요."}/>
      </FormControl>
      <Stack>
        <Box>포장 요청사항</Box>
        <Radio size='sm' name='1' colorScheme='red'>
          포장해주세요
        </Radio>
        <Radio size='md' name='1' colorScheme='green'>
          매장에서 먹고 갈게요
        </Radio>
      </Stack>
    </Box>
  </Box>);
}