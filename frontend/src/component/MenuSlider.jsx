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
      <Box>
        {products.map((product) => (
          <Box key={product.id} position="relative" width="100%" height="475px">
            <Flex
              alignItems="center"
              justifyContent="center"
              width="100%"
              // opacity={currentSlide === index ? 1 : 0.3}
              transition="opacity 0.3s"
            >
              <Card
                onClick={() => {
                  navigate(`/product/${product.id}`);
                  window.scrollTo({ top: 0, behavior: "auto" });
                }}
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
                      // src={product.productFileList[0].filePath}
                      w="100%"
                      h="250px"
                      transition="transform 0.2s"
                      _hover={{ transform: "scale(1.05)" }}
                    />
                    <Box
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      <Text
                        fontSize={"xl"}
                        fontWeight={"600"}
                        w={10}
                        h={10}
                        bgColor={"white"}
                        borderRadius={"5px"}
                        position="absolute"
                        top={2}
                        left={2}
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        textAlign={"center"}
                      >
                        {product.title}
                      </Text>
                      <Text>{product.content}</Text>
                    </Box>
                  </Box>
                </CardBody>
              </Card>
            </Flex>

            {/*  <Image*/}
            {/*    src={`https://huistudybucket01.s3.ap-northeast-2.amazonaws.com/${product.file_path}`}*/}
            {/*    width="100%"*/}
            {/*    height="300px"*/}
            {/*    objectFit="contain"*/}
            {/*  />*/}
            {/*  <Text fontSize="xl" fontWeight="bold">*/}
            {/*    {product.title}*/}
            {/*  </Text>*/}
            {/*  <Text>{product.content}</Text>*/}
          </Box>
        ))}
      </Box>
    </Slider>
  );
}

export default MenuSlider;
