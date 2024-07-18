import React from "react";
import { Box, Button, Flex, Grid, Heading, Spacer } from "@chakra-ui/react";

function Stamp(props) {
  const boxes = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <Box>
      <Flex>
        <Heading>스탬프</Heading>
        <Spacer />
        <Button>적립내역 보기</Button>
      </Flex>
      <Box bgColor={"yellow"} w={"520px"} h={"300px"} borderRadius={"20px"}>
        <Flex alignItems="center" height="300" justifyContent="center">
          <Grid templateColumns="repeat(5, 1fr)" gap={7} alignItems="center">
            {boxes.map((box, index) => (
              <Box
                bg="rgba(0, 0, 0, 0.1)"
                borderRadius={"full"}
                key={index}
                w="50px"
                h="50px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                color="white"
              >
                {box}
              </Box>
            ))}
          </Grid>
        </Flex>
      </Box>
    </Box>
  );
}

export default Stamp;
