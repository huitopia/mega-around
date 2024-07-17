import { FormControl, FormLabel, HStack, Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const CategoryComp = (props) => {
  const [mainCategory, setMainCategory] = useState("");
  const mainCategoryOption = ["커피", "디카페인", "음료", "티", "푸드", "상품"];
  const [subCategoryOption, setSubCategoryOption] = useState([]);

  useEffect(() => {
    switch (mainCategory) {
      case "커피":
      case "디카페인":
        setSubCategoryOption(["에스프레소", "라떼", "콜드브루"]);
        break;
      case "음료":
        setSubCategoryOption([
          "에이드",
          "프라페",
          "스무드&주스",
          "논-커피 라떼",
        ]);
        break;
      case "티":
        setSubCategoryOption(["티플레저", "클래식"]);
        break;
      case "푸드":
        setSubCategoryOption(["디저트", "베이커리", "케이크"]);
        break;
      case "상품":
        setSubCategoryOption(["병음료", "홈카페", "굿즈"]);
        break;
      default:
        setSubCategoryOption([]);
        break;
    }
  }, [mainCategory]);

  const handleMainCategory = (event) => {
    setMainCategory(event.target.value);
  };

  const handleSubCategory = (event) => {
    props.category({
      mainCategory,
      subCategory: event.target.value,
    });
  };

  return (
    <FormControl>
      <FormLabel>카테고리</FormLabel>
      <HStack>
        <Select
          onChange={handleMainCategory}
          placeholder={"카테고리를 선택해주세요"}
        >
          {mainCategoryOption.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>
        <Select
          onChange={handleSubCategory}
          placeholder={"카테고리를 선택해주세요"}
        >
          {subCategoryOption.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>
      </HStack>
    </FormControl>
  );
};
