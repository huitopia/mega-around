import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Box,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";

function MenuSlider({ products }) {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2500,
    cssEase: "linear",
  };

  return (
    <Slider {...settings}>
      {products.map((product) => (
        <Box key={product.id} width="100%" p={2}>
          <Flex
            alignItems="center"
            justifyContent="center"
            width="100%"
            height="100%"
          >
            <Card
              width="300px"
              boxShadow="none"
              h="460px"
              borderRadius="5px"
              overflow="hidden"
              border="1px solid #eee"
            >
              <CardBody h="300px">
                <Image
                  src={`https://huistudybucket01.s3.ap-northeast-2.amazonaws.com/${product.file_path}`}
                  w="100%"
                  h="250px"
                  objectFit="cover"
                />
              </CardBody>
              <CardFooter
                bgColor="#f4f6f8"
                display="flex"
                flexDirection="column"
                justifyContent="start"
                alignItems="center"
                p={4}
                h="100%"
                w="100%"
              >
                <Text fontSize="1.2rem" mb={2} textAlign="left" p={2}>
                  {product.title.length < 17 ? (
                    product.title
                  ) : (
                    <Text whiteSpace={"nowrap"}>{product.title}</Text>
                  )}
                </Text>
                <Text
                  textAlign="left"
                  color="gray"
                  overflow="hidden"
                  whiteSpace="wrap"
                >
                  {product.content}
                </Text>
              </CardFooter>
            </Card>
          </Flex>
        </Box>
      ))}
    </Slider>
  );
}

export default MenuSlider;
