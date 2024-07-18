import { Button, Tab, TabList, Tabs } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export function CategoryTabComp(props) {
  let [subCategoryOption, setSubCategoryOption] = useState([]);
  const mainCategoryOption = ["커피", "디카페인", "음료", "티", "푸드", "상품"];
  let [mainCategory, setMainCategory] = useState("커피");
  let [selectSubCategory, setSelectSubCategory] = useState("에스프레소");

  const handleMainCategory = (category) => {
    setMainCategory(category);
  };

  const handleSubCategory = (event) => {
    setSelectSubCategory(event.target.value);
  };

  useEffect(() => {
    props.category({
      mainCategory,
      subCategory: selectSubCategory,
    });
  }, [selectSubCategory]);

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
          "스무디&주스",
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
    setSelectSubCategory("");
  }, [mainCategory]);

  return (
    <Tabs isFitted variant="enclosed">
      <TabList mb="1em">
        {mainCategoryOption.map((category) => (
          <Tab key={category} onClick={() => handleMainCategory(category)}>
            {category}
          </Tab>
        ))}
      </TabList>

      {subCategoryOption.length > 0 ? (
        subCategoryOption.map((subCategory) => (
          <Button
            onClick={handleSubCategory}
            key={subCategory}
            value={subCategory}
            borderRadius="20px"
            m="1"
            sx={
              selectSubCategory === subCategory
                ? { bg: "blue.400", color: "white" }
                : {}
            }
          >
            {subCategory}
          </Button>
        ))
      ) : (
        <p>서브 카테고리를 선택해주세요.</p>
      )}
    </Tabs>
  );
}