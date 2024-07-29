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

export const RoundGrayButtonStyle = {
  bg : "#adb5bd",       // 배경 색상
  color : "white",    // 글자 색상
  width : "40px",
  height : "40px",
  fontSize:"xs",
  borderRadius : "full",  // 원형으로 만들기
  _hover : { bg: "#adb5bd" },  // 호버 상태에서 배경 색상 변경 (옵션)
_active : { bg: "#adb5bd" }, // 클릭 상태에서 배경 색상 변경 (옵션)
}

export const RoundBlackButtonStyle = {
  bg : "black",       // 배경 색상
  color : "white",    // 글자 색상
  width : "40px",
  height : "40px",
  fontSize:"lg",
  borderRadius : "full",  // 원형으로 만들기
  _hover : { bg: "black" },  // 호버 상태에서 배경 색상 변경 (옵션)
  _active : { bg: "black" }, // 클릭 상태에서 배경 색상 변경 (옵션)
  p :0            // 패딩 조정
}