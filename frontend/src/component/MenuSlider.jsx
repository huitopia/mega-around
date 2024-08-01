import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Card, CardBody, Flex, Image, Text } from "@chakra-ui/react";

function MenuSlider({ products }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: true,
    centerMode: false,
    overflow: "hidden",
  };

  return (
    <Slider {...settings}>
      {products.map((product) => (
        <Box key={product.id} position="relative" width="100%" height="475px">
          <Flex
            alignItems="center"
            justifyContent="center"
            width="100%"
            transition="opacity 0.3s"
          >
            <Card
              w={"70%"}
              boxShadow={"none"}
              cursor={"pointer"}
              maxW="sm"
              h="100%"
              borderRadius={"5px"}
              overflow="hidden"
              border={"1px solid #eee"}
            >
              <CardBody position="relative" h="100%" p={0}>
                <Box position="relative">
                  <Image
                    src={`https://huistudybucket01.s3.ap-northeast-2.amazonaws.com/${product.file_path}`}
                    w="100%"
                    h="250px"
                    transition="transform 0.2s"
                    objectFit="cover"
                  />
                  <Box
                    display={"flex"}
                    flexDirection="column"
                    justifyContent={"center"}
                    alignItems={"center"}
                    p={4}
                  >
                    <Text
                      fontSize={"xl"}
                      fontWeight={"600"}
                      bgColor={"white"}
                      borderRadius={"5px"}
                      mb={2}
                      textAlign={"center"}
                      p={2}
                    >
                      {product.title}
                    </Text>
                    <Text textAlign="center">{product.content}</Text>
                  </Box>
                </Box>
              </CardBody>
            </Card>
          </Flex>
        </Box>
      ))}
    </Slider>
  );
}

export default MenuSlider;
