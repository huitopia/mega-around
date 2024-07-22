import { extendTheme } from "@chakra-ui/react";

const colors = {
  yellow: "#ffde00", // Replace with your desired yellow color
  orange : "#401F02"
};

const components = {
  Button: {
    variants: {
      solid: (props) => {
        if (props.colorScheme === 'orange') {
          return {
            bg: 'orange', // 원하는 새로운 색상
            color: 'white',
            _hover: {
              bg: 'orange',
            },
          };
        }
      }
    }
  }
}

export const theme = extendTheme({ colors, components });
