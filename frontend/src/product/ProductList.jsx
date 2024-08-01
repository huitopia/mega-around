import { Box, Center, Heading } from "@chakra-ui/react";
import { CategoryTabComp } from "./component/CategoryTabComp.jsx";
import { useState } from "react";
import { ProductBodyComp } from "./component/ProductBodyComp.jsx";
import { useLocation } from "react-router-dom";

export const ProductList = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const branchId = searchParams.get("branchId");
  const [mainCategory, setMainCategory] = useState("커피");
  const [subCategory, setSubCategory] = useState("에스프레소");

  const category = (category) => {
    setMainCategory(category.mainCategory);
    setSubCategory(category.subCategory);
  };

  return (
    <Box maxWidth="1200px" mx={"auto"}>
      <Box mt={"60px"} mb={"60px"}>
        <Center>
          <Heading size="2xl">MEGA MENU</Heading>
        </Center>
      </Box>
      <CategoryTabComp category={category} />
      <ProductBodyComp
        branchId={branchId}
        mainCategory={mainCategory}
        subCategory={subCategory}
      />
    </Box>
  );
};
