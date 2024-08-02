import { Box, Center, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { CouponComp } from "./component/CouponComp.jsx";

export function Coupon() {
  const [couponCount, setCouponCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [couponList, setCouponList] = useState(null);

  useEffect(() => {
    axios("/api/event/coupon")
      .then((res) => {
        setCouponCount(res.data);
      })
      .finally(() => setLoading(false));
    axios("/api/notice/coupon").then((res) => setCouponList(res.data));
  }, []);

  if (couponList === null) {
    return <Box>쿠폰 적립 내역이 없습니다</Box>;
  }

  return (
    <Box>
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
            COUPON
          </Heading>
        </Box>
      </Box>
      <Box maxWidth="1000px" mx={"auto"} mt={10}>
        {couponCount > 0 ? (
          <Box ml={3}>
            <Flex
              fontWeight={"bold"}
              fontSize={"xl"}
              alignItems="center"
              mb={3}
              gap={1}
            >
              <Text fontSize={"27px"}>사용할 수 있는 쿠폰이</Text>
              <Text fontSize={"30px"} color={"#FDD000"}>
                {couponCount}
              </Text>
              <Text fontSize={"27px"}>장 있어요!</Text>
            </Flex>
            <CouponComp />
          </Box>
        ) : (
          <Center>
            <Box fontSize={"18px"}>보유한 쿠폰이 없습니다.</Box>
          </Center>
        )}{" "}
        <Box>
          <Box fontWeight={"bold"} mt={"60px"} fontSize={"lg"} mb={3} ml={3}>
            적립 및 사용내역
          </Box>
          {couponList.map((coupon, index) => (
            <Box key={index} ml={5}>
              <Box>{coupon.content}</Box>
              <Box fontSize={"sm"}>{coupon.createdAtString}</Box>
              {index < couponList.length - 1 && (
                <Divider borderColor="gray.200" my={4} />
              )}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
