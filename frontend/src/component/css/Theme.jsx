import { extendTheme } from "@chakra-ui/react";

const colors = {
  yellow: "#ffde00", // Replace with your desired yellow color
  orange: "#401F02",
  pink: "#e8e4e0",
};

const components = {
  Button: {
    variants: {
      solid: (props) => {
        if (props.colorScheme === "orange") {
          return {
            bg: "orange", // 원하는 새로운 색상
            color: "white",
            _hover: {
              bg: "orange",
            },
          };
        } else if (props.colorScheme === "pink") {
          return {
            bg: "pink", // 원하는 새로운 색상
            color: "orange",
            _hover: {
              bg: "pink",
            },
          };
        } else if (props.colorScheme === "yellow") {
          return {
            bg: "yellow",
            color: "black",
            _hover: {
              bg: "yellow",
            },
          };
        }
      },
    },
  },
  Radio: {
    baseStyle: {
      control: {
        borderColor: "gray.200",  // 원의 테두리 색상
        _checked: {
          bg: "black",  // 체크된 상태의 배경 색상
          borderColor: "black", // 체크된 상태의 테두리 색상
        },
      },
      label: {
        color: "black",  // 라벨 색상
      },
    },
  },
};

export const theme = extendTheme({ colors, components });
