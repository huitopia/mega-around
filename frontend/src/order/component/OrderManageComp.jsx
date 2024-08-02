import {
  Badge,
  Box,
  Card,
  CardBody,
  Center,
  Flex,
  Image,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { BranchPageModalComp } from "./BranchPageModalComp.jsx";
import Slider from "react-slick";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CustomPrevArrow(props) {
  const { onClick } = props;
  return (
    <div
      className="custom-prev-arrow"
      onClick={onClick}
      style={{
        position: "absolute",
        top: "50%",
        left: "-20px",
        transform: "translateY(-50%)",
        color: "#401F02",
        fontSize: "24px",
        cursor: "pointer",
        zIndex: 1, // 클릭 가능하도록 설정
      }}
    >
      <FontAwesomeIcon icon={faChevronLeft} />
    </div>
  );
}

function CustomNextArrow(props) {
  const { onClick } = props;
  return (
    <div
      className="custom-next-arrow"
      onClick={onClick}
      style={{
        position: "absolute",
        top: "50%",
        left: "1200px",
        transform: "translateY(-50%)",
        color: "#401F02",
        fontSize: "24px",
        cursor: "pointer",
        zIndex: 1, // 클릭 가능하도록 설정
      }}
    >
      <FontAwesomeIcon icon={faChevronRight} />
    </div>
  );
}

export function OrderManageComp({
  stateId,
  branchId,
  text,
  setIsChanged,
  isChanged,
  date,
  startTime,
  endTime,
}) {
  const [orderList, setOrderList] = useState(null);
  const { onClose, isOpen, onOpen } = useDisclosure();
  const [orderId, setOrderId] = useState(0);

  const settings = {
    dots: false,
    infinite: false,
    arrows: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    draggable: false,
    overflow : "hidden",
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  useEffect(() => {
    setIsChanged(false);
    axios
      .get(`/api/orders/list?stateId=${stateId}&branchId=${branchId}&date=${date}&startTime=${startTime}&endTime=${endTime}`)
      .then((res) => setOrderList(res.data));
  }, [isChanged]);

  if (orderList === null) {
    return <Spinner />;
  }

  return (
    <Flex h={"240px"} borderBottom="1px solid #e9ecef">
      <Center w={"150px"} mr={"50px"}>
        <Box fontWeight={"bold"} fontSize={"20px"}>
          {text}(
        </Box>
        <Flex fontSize={"20px"} fontWeight={"bold"}><Box color={"red"}>{orderList.length}</Box><Box fontWeight={"bold"} fontSize={"20px"}>)</Box></Flex>
      </Center>
      <Box w={"1100px"}>
        <Slider {...settings}>
          {orderList.map((order, index) => (
            <Card
              variant={"outline"}
              border="1px solid #e9ecef"
              key={index}
              onClick={() => {
                onOpen();
                setOrderId(order.id);
              }}
              zIndex={1}
              w={"220px"}
              h={"240px"}
              mx={1}
            >
              <CardBody>
                <Flex direction="column" h="100%" justify="space-between">
                  <Flex direction="column" align="center">
                    <Box>
                      {order.orderProduct[0].productName}{" "}
                      {order.orderProduct[0].count}개
                      {order.orderProduct.length > 1 && (
                        <Badge bg={"#DBC54B"} ml={3}>
                          외 {order.orderProduct.length - 1}개
                        </Badge>
                      )}
                    </Box>
                    <Image
                      w={"110px"}
                      h={"110px"}
                      src={
                        "https://huistudybucket01.s3.ap-northeast-2.amazonaws.com/" +
                        order.orderProduct[0].filePath
                      }
                    />
                    <Flex direction={"column"} gap={3} alignItems={"center"}>
                      <Flex direction="row" align="center" gap={1}>
                        {order.isTakeOut == 1 ? (
                          <Badge bg={"orange"} color="white">
                            포장
                          </Badge>
                        ) : (
                          <Badge bg={"yellow"}>매장</Badge>
                        )}
                        {order.orderProduct[0].optionList.length > 0 && (
                          <Badge bg={"pink"}>옵션</Badge>
                        )}
                      </Flex>
                      <Box>
                        {order.option[0] && (
                          <Box fontSize={"xs"}>- 포장해주세요</Box>
                        )}
                        {order.option[1] && (
                          <Box fontSize={"xs"}>- 캐리어/봉투 필요해요</Box>
                        )}
                      </Box>
                    </Flex>
                  </Flex>
                </Flex>
              </CardBody>
            </Card>
          ))}
        </Slider>
      </Box>
      <BranchPageModalComp
        isOpen={isOpen}
        onClose={onClose}
        stateId={stateId}
        orderId={orderId}
        setIsChanged={setIsChanged}
      />
    </Flex>
  );
}
