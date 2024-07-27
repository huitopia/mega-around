// Theme.jsx
import { createMultiStyleConfigHelpers, extendTheme } from "@chakra-ui/react";
import { menuAnatomy } from "@chakra-ui/anatomy";

const colors = {
  yellow: "#ffde00", // 원하는 색상
  orange: "#401F02",
  pink: "#e8e4e0",
};

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(menuAnatomy.keys);

// define the base component styles
const baseStyle = definePartsStyle({
  button: {
    fontWeight: "medium",
    bg: "teal.800",
    color: "gray.200",
    _hover: {
      bg: "teal.600",
      color: "white",
    },
  },
  list: {
    py: "4",
    borderRadius: "xl",
    border: "none",
    bg: "teal.500",
  },
  item: {
    color: "gray.200",
    _hover: {
      bg: "teal.600",
    },
    _focus: {
      bg: "teal.600",
    },
  },
});

const menuTheme = defineMultiStyleConfig({ baseStyle });

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
  Menu: menuTheme,
};

export const theme = extendTheme({ colors, components });
