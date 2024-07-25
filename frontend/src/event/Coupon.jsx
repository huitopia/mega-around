import { Box, Divider, Heading } from "@chakra-ui/react";

export function Coupon() {
  return (
    <Box maxWidth="1000px" mx={"auto"}>
      <Box>
        <Heading>Coupon</Heading>
      </Box>
      <Divider border={"1px solid black"} my={4} />
    </Box>
  );
}
