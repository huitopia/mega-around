import React from "react";
import Slider from "react-slick";
import { Box, Flex, Image } from "@chakra-ui/react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const bannerData = [
  {
    id: 1,
    src: "https://img.79plus.co.kr/megahp/manager/upload/main/20240703135039_1719982239946_0Bk6ojXQ9v.jpg?ver=202207071306",
  },
  {
    id: 2,
    src: "https://img.79plus.co.kr/megahp/manager/upload/main/20240501230732_1714572452251_kVyvpUlHrh.jpg?ver=202207071306",
  },
  {
    id: 3,
    src: "https://img.79plus.co.kr/megahp/manager/upload/main/20240620072546_1718835946243_xjLMNcBXdv.jpg?ver=202207071306",
  },
  {
    id: 4,
    src: "https://img.79plus.co.kr/megahp/manager/upload/main/20240724233113_1721831473285_9ec7uipMPV.jpg?ver=202207071306",
  },
  {
    id: 5,
    src: "https://img.79plus.co.kr/megahp/manager/upload/main/20240325103859_1711330739535_CJJkXalnjg.jpg?ver=202207071306",
  },
];
export default function SimpleSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: false,
    centerPadding: "0px",
    appendDots: (dots) => (
      <Flex justifyContent="center" mt="-30px">
        <ul style={{ margin: "-10px" }}> {dots} </ul>
      </Flex>
    ),
  };

  return (
    <Slider {...settings} style={{ width: "100%", height: "100%" }}>
      {bannerData.map((banner) => (
        <Box key={banner.id} width="100%" height="100%">
          <Image
            src={banner.src}
            width="100%"
            height="100%"
            objectFit="contain"
          />
        </Box>
      ))}
    </Slider>
  );
}
