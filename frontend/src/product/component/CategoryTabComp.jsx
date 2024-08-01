import { Button, Tab, TabList, Tabs } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export function CategoryTabComp(props) {
  let [subCategoryOption, setSubCategoryOption] = useState([]);
  const mainCategoryOption = ["커피", "디카페인", "음료", "티", "푸드", "상품"];
  let [mainCategory, setMainCategory] = useState("커피");
  let [selectSubCategory, setSelectSubCategory] = useState("에스프레소");

  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    props.category({
      mainCategory,
      subCategory: selectSubCategory,
    });
    setProcessing(false);
  }, [selectSubCategory, processing]);

  useEffect(() => {
    switch (mainCategory) {
      case "커피":
      case "디카페인":
        setSelectSubCategory("에스프레소");
        setSubCategoryOption(["에스프레소", "라떼", "콜드브루"]);
        setProcessing(true);
        break;
      case "음료":
        setSelectSubCategory("에이드");
        setSubCategoryOption([
          "에이드",
          "프라페",
          "스무디&주스",
          "논-커피 라떼",
        ]);
        break;
      case "티":
        setSelectSubCategory("티플레저");
        setSubCategoryOption(["티플레저", "클래식"]);
        break;
      case "푸드":
        setSelectSubCategory("디저트");
        setSubCategoryOption(["디저트", "베이커리", "케이크"]);
        break;
      case "상품":
        setSelectSubCategory("병음료");
        setSubCategoryOption(["병음료", "홈카페", "굿즈"]);
        break;
      default:
        setSubCategoryOption([]);
        break;
    }
  }, [mainCategory]);

  const handleMainCategory = (category) => {
    setMainCategory(category);
  };

  const handleSubCategory = (event) => {
    setSelectSubCategory(event.target.value);
  };

  return (
    <Tabs isFitted variant="enclosed">
      <TabList height={"60px"} mb={"20px"}>
        {mainCategoryOption.map((category) => (
          <Tab
            cursor={"pointer"}
            as={"b"}
            key={category}
            onClick={() => handleMainCategory(category)}
            sx={
              category === mainCategory
                ? { bg: "#ffde00", color: "#401F02" }
                : {}
            }
          >
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
                ? { bg: "#ffde00", color: "#401F02" }
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
