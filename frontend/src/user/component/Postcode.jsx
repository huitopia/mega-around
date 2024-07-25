import React from "react";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { Button } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

export const Postcode = ({ onAddressSelect }) => {
  const scriptUrl =
    "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
  const open = useDaumPostcodePopup(scriptUrl);

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    onAddressSelect(fullAddress, extraAddress);
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <Button
      type="button"
      leftIcon={<Search2Icon />}
      cursor={"pointer"}
      onClick={handleClick}
    >
      주소 검색
    </Button>
  );
};
