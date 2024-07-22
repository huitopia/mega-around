import {
  Box,
  Divider,
  Heading, HStack,
  Progress,
  Spinner,
  Step,
  StepIcon,
  StepIndicator,
  Stepper, StepSeparator,
  StepStatus,
  Image,
  Text, useSteps, Stack, Flex, Spacer
} from "@chakra-ui/react";
import {CategoryTabComp} from "../product/component/CategoryTabComp.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import {render} from "react-dom";

export function OrderDetail() {
  const [order, setOrder] = useState(null);
  const [progress, setProgress] = useState(1);
  const {id} = useParams();

  useEffect(() => {
    axios.get(`/api/orders/${id}`).then((res) => {setOrder(res.data)
    setProgress(res.data.stateId); console.log(res.data)});
  }, []);

  const steps = [
    { title: 'First', description: '결제완료' },
    { title: 'Second', description: '제조중' },
    { title: 'Third', description: '제조완료' },
  ]

  const {activeStep, setActiveStep} = useSteps({
      index: progress,
      count: steps.length,
  })

  const activeStepText = steps[activeStep].description

  const progressPercent = ((progress)/ 2) * 100;

  if (order === null) {
    return <Spinner/>
  }

  return <Box maxWidth="1000px" mx={"auto"}>
    <Box>
      <Heading>Order Detail</Heading>
    </Box>
    <Divider border={"1px solid black"} my={4} />
    <Box>
      <Box>1시간 이내에 찾아가지 않으실 경우
      품질 및 보관 문제로 폐기 될 수 있습니다.
      </Box>
      <Box>
        <Box>{order.branchName}</Box>
        <Box>주문번호 : {order.id}</Box>
        <Box>{order.createdAtString}</Box>
      </Box>
      <Box>까지 제조가 완료될 예정입니다.</Box>
      <Box position='relative'>
        <Stepper size='sm' index={activeStep} gap='0'>
          {steps.map((step,index) => (
            <Box>
            <Step key={index} gap='0'>
              <StepIndicator bg='white'>
                <StepStatus complete={<StepIcon />} />
              </StepIndicator>
              <StepSeparator _horizontal={{ ml: '0' }} />
            </Step>
          <Text>
            {steps[index].description}
          </Text>
            </Box>
        ))}
        </Stepper>

      <Progress
        value={progressPercent}
        position="absolute"
        height='3px'
        width='full'
        top='10px'
        zIndex={-1}
      />
      </Box>
      <HStack>
        <Image w="50px" h={"50px"} src={"https://huistudybucket01.s3.ap-northeast-2.amazonaws.com/" + order.orderProduct[0].filePath}/>
        <Box>
          <Box>{order.orderProduct[0].productName}</Box>
          <Box>{order.orderProduct[0].count}개</Box>
        </Box>
        <Box>
          {order.totalPrice}
        </Box>
      </HStack>
      <Box>
        <Flex><Box>결제수단</Box><Spacer/><Box></Box></Flex>
        <Flex><Box>상품금액</Box><Spacer/><Box>{order.totalPrice}원</Box></Flex>
        <Flex><Box>할인금액</Box><Spacer/><Box>-0원</Box></Flex>
        <Flex><Box>결제금액</Box><Spacer/><Box>{order.totalPrice}원</Box></Flex>
      </Box>
    </Box>
  </Box>;
}