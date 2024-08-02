// Theme.jsx
import { createMultiStyleConfigHelpers, extendTheme } from "@chakra-ui/react";
import { menuAnatomy } from "@chakra-ui/anatomy";

const colors = {
  yellow: "#ffde00", // Replace with your desired yellow color
  orange: "#401F02",
  pink: "#e8e4e0",
};

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(menuAnatomy.keys);

// define the base component styles
const baseStyle = definePartsStyle({
  // define the part you're going to style
  button: {
    // as={Text}는 스타일 적용안됨
    // this will style the MenuButton component
    fontWeight: "medium",
    // bg: "teal.500",
    color: "gray.200",
    _hover: {
      bg: "teal.600",
      color: "white",
    },
  },
  list: {
    // this will style the MenuList component
    py: "0",
    borderRadius: "l",
    border: "1px solid #c3d2e4",
    bg: "white",
    width: `40px`,
  },
  item: {
    // this will style the MenuItem and MenuItemOption components
    color: "black",
    _hover: {
      bg: "gray.200",
    },
    // _focus: {
    //   bg: "teal.600",
    // },
  },
});

const menuTheme = defineMultiStyleConfig({
  baseStyle,
});

const components = {
  Button: {
    variants: {
      solid: (props) => {
        if (props.colorScheme === "orange") {
          return {
            bg: "orange",
            color: "white",
            _hover: {
              bg: "orange",
            },
          };
        } else if (props.colorScheme === "pink") {
          return {
            bg: "pink",
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
        borderColor: "gray.200", // 원의 테두리 색상
        _checked: {
          bg: "black", // 체크된 상태의 배경 색상
          borderColor: "black", // 체크된 상태의 테두리 색상
        },
      },
      label: {
        color: "black", // 라벨 색상
      },
    },
  },
  Menu: menuTheme,
};

export const theme = extendTheme({ colors, components });
