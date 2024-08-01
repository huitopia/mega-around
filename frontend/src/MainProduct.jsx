import { Box, Center, Text } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "./component/LoginProvider.jsx";
import SimpleSlider from "./component/SimpleSlider.jsx";
import { faStamp, faTicket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Link } from "react-router-dom";
import MenuSlider from "./component/MenuSlider.jsx";

export function MainProduct() {
  const account = useContext(LoginContext);
  const [couponCount, setCouponCount] = useState(0);
  const [stampCount, setStampCount] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("/api/event/coupon")
      .then((res) => {
        setCouponCount(res.data || 0);
      })
      .catch(() => {
        setCouponCount(0); // 에러 발생 시 0으로 설정
      });
  }, []);

  useEffect(() => {
    axios
      .get("/api/event/stamp")
      .then((res) => {
        setStampCount(res.data || 0);
      })
      .catch(() => {
        setStampCount(0); // 에러 발생 시 0으로 설정
      });
  }, []);

  useEffect(() => {
    axios
      .get("/api/")
      .then((res) => {
        setProducts(res.data);
      })
      .catch(() => {
        setProducts([]); // 에러 발생 시 빈 배열로 설정
      });
  }, []);

  return (
    <>
      <Box h="100%" w="100%" boxSizing="border-box" mx="auto" overflow="hidden">
        <SimpleSlider />
      </Box>
      {/*{account.hasAuth() === "customer" && (*/}
      {/*  <>*/}
      {/*    <Center p={"140px"} flexDirection={"row"}>*/}
      {/*      <Box flex={"2"} textAlign="center">*/}
      {/*        <Text fontWeight={"bold"} fontSize={"1.4rem"}>*/}
      {/*          {account.nickName}*/}
      {/*          {account.branchName}&nbsp;님 환영합니다!*/}
      {/*        </Text>*/}
      {/*      </Box>*/}
      {/*      <Box*/}
      {/*        flex={"3"}*/}
      {/*        textAlign={"center"}*/}
      {/*        fontSize={"1.2rem"}*/}
      {/*        bgColor={"pink"}*/}
      {/*        color={"orange"}*/}
      {/*        maxWidth={"700px"}*/}
      {/*        height={"50px"}*/}
      {/*        borderRadius={10}*/}
      {/*        display="flex"*/}
      {/*        justifyContent={"center"}*/}
      {/*        alignItems={"center"}*/}
      {/*        p={10}*/}
      {/*      >*/}
      {/*        <Box*/}
      {/*          display="flex"*/}
      {/*          gap={10}*/}
      {/*          justifyContent={"center"}*/}
      {/*          alignItems={"center"}*/}
      {/*        >*/}
      {/*          <Link*/}
      {/*            to={"/stamp"}*/}
      {/*            onClick={() => window.scrollTo({ top: 0, behavior: "auto" })}*/}
      {/*          >*/}
      {/*            <Box display="flex" alignItems="center" gap={2}>*/}
      {/*              <FontAwesomeIcon icon={faStamp} />*/}
      {/*              <Text>스탬프</Text>*/}
      {/*              <Text>{stampCount}</Text>*/}
      {/*            </Box>*/}
      {/*          </Link>*/}
      {/*          <Link*/}
      {/*            to={"/coupon"}*/}
      {/*            onClick={() => window.scrollTo({ top: 0, behavior: "auto" })}*/}
      {/*          >*/}
      {/*            <Box display="flex" alignItems="center" gap={2}>*/}
      {/*              <FontAwesomeIcon icon={faTicket} />*/}
      {/*              <Text>쿠폰</Text>*/}
      {/*              <Text>{couponCount}</Text>*/}
      {/*            </Box>*/}
      {/*          </Link>*/}
      {/*        </Box>*/}
      {/*      </Box>*/}
      {/*      /!*<Box flex={"1"} /> /!* 빈 공간을 위한 박스 *!/*!/*/}
      {/*    </Center>*/}
      {/*  </>*/}
      {/*)}*/}

      {account.isLoggedIn() && (
        <Box textAlign="center" mt={"100px"}>
          <Text fontWeight={"bold"} fontSize={"1.4rem"}>
            {account.nickName}
            {account.branchName}&nbsp;님 환영합니다!
          </Text>
        </Box>
      )}
      {account.hasAuth() === "customer" && (
        <>
          <Box textAlign="center">
            <Text fontSize="0.9rem" mt={9}>
              회원님이 적립하신 스탬프와 쿠폰입니다
            </Text>
          </Box>
          <Center mt={5} mb="150px">
            <Box
              textAlign={"center"}
              fontSize={"1.2rem"}
              bgColor={"pink"}
              color={"orange"}
              width={"70%"}
              height={"50px"}
              alignItems={"center"}
              p={10}
              display="flex"
              justifyContent={"center"}
            >
              <Box
                display="flex"
                gap={10}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Link
                  to={"/stamp"}
                  onClick={() => window.scrollTo({ top: 0, behavior: "auto" })}
                >
                  <Box display="flex" alignItems="center" gap={2}>
                    <FontAwesomeIcon icon={faStamp} />
                    <Text>스탬프</Text>
                    <Text>{stampCount}</Text>
                  </Box>
                </Link>
                <Link
                  to={"/coupon"}
                  onClick={() => window.scrollTo({ top: 0, behavior: "auto" })}
                >
                  <Box display="flex" alignItems="center" gap={2}>
                    <FontAwesomeIcon icon={faTicket} />
                    <Text>쿠폰</Text>
                    <Text>{couponCount}</Text>
                  </Box>
                </Link>
              </Box>
            </Box>
          </Center>
        </>
      )}

      <Box mt={14} ml={"100px"}>
        <Box fontSize={"xl"} fontWeight={600} mb={10}>
          {account.isLoggedIn() ? (
            <>
              {account.nickName}
              {account.branchName}&nbsp;님을 위한 추천메뉴
            </>
          ) : (
            <Text mt={"100px"}>추천메뉴</Text>
          )}
        </Box>
        <Box width="100%" overflow="hidden">
          <MenuSlider products={products} />
        </Box>
      </Box>
    </>
  );
}
