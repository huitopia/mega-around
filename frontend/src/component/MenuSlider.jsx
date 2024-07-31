import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Image } from "@chakra-ui/react";

function MenuSlider({ images }) {
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
      {images.map((file, index) => (
        <Box key={index} position="relative" width="100%" height="475px">
          <Image
            src={file.filePath}
            className="slick-custom-image"
            width="100%"
            height="100%"
            objectFit="contain"
          />
        </Box>
      ))}
    </Slider>
  );
}

export default MenuSlider;
