import { Box, Center, Text } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "./component/LoginProvider.jsx";
import SimpleSlider from "./component/SimpleSlider.jsx";
import { faStamp, faTicket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Link } from "react-router-dom";

export function MainProduct() {
  const account = useContext(LoginContext);
  const [couponCount, setCouponCount] = useState(0);
  const [stampCount, setStampCount] = useState(0);

  useEffect(() => {
    axios.get("/api/event/coupon").then((res) => {
      setCouponCount(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get("/api/event/stamp").then((res) => {
      setStampCount(res.data);
    });
  }, []);

  return (
    <>
      <SimpleSlider />
      <Center p={20} flexDirection={"row"}>
        {account.isLoggedIn() && (
          <>
            <Box flex={"2"} textAlign={"center"} pt={1} pb={1}>
              <Text fontWeight={"bold"} fontSize={"1.8rem"}>
                {account.nickName}
                {account.branchName}&nbsp;님
              </Text>
            </Box>
            <Box
              flex={"3"}
              textAlign={"center"}
              fontSize={"1.2rem"}
              bgColor={"gray.100"}
              maxWidth={"400px"}
              height={"70px"}
              borderRadius={10}
              display="flex"
              justifyContent={"center"}
              alignItems={"center"}
              p={10}
            >
              <Box
                display="flex"
                gap={10}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Link to={"/stamp"}>
                  <Box display="flex" alignItems="center" gap={2}>
                    <FontAwesomeIcon icon={faStamp} />
                    <Text>스탬프</Text>
                    <Text>{stampCount}</Text>
                  </Box>
                </Link>
                <Link to={"/coupon"}>
                  <Box display="flex" alignItems="center" gap={2}>
                    <FontAwesomeIcon icon={faTicket} />
                    <Text>쿠폰</Text>
                    <Text>{couponCount}</Text>
                  </Box>
                </Link>
              </Box>
            </Box>
            <Box flex={"1"} /> {/* 빈 공간을 위한 박스 */}
          </>
        )}
      </Center>
    </>
  );
}
