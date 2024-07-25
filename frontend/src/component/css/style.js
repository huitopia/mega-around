export const checkBoxStyle = {
  sx: {
    ".chakra-checkbox__control": {
      borderRadius: "50%", // 원형 모양
      borderColor: "gray.400",
      _checked: {
        bg: "blue.500",
        borderColor: "blue.500",
        zIndex : -1,
        _before: {
          content: `""`,
          display: "block",
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          bg: "white",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        },
      },
    },
    ".chakra-checkbox__label": {
      ml: 2,
    },
  },
};
