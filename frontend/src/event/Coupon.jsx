import { Box, Divider, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

export function Coupon() {
  const [couponCount, setCouponCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios("/api/event/coupon")
      .then((res) => {
        setCouponCount(res.data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box maxWidth="1000px" mx={"auto"}>
      <Box>
        <Heading>Coupon</Heading>
      </Box>
      <Divider border={"1px solid black"} my={4} />
      {loading ? (
        <Box>Loading...</Box>
      ) : couponCount > 0 ? (
        <Box>보유한 쿠폰 수: {couponCount}</Box>
      ) : (
        <Box>보유한 쿠폰이 없습니다.</Box>
      )}{" "}
    </Box>
  );
}
