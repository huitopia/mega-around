import { Box, Divider, Heading } from "@chakra-ui/react";
import { CategoryTabComp } from "./component/CategoryTabComp.jsx";
import { useState } from "react";
import { ProductBodyComp } from "./component/ProductBodyComp.jsx";
import { useLocation } from "react-router-dom";

export const ProductList = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const branchId = searchParams.get("branchId");
  const branchName = searchParams.get("branchName");
  const [mainCategory, setMainCategory] = useState("커피");
  const [subCategory, setSubCategory] = useState("에스프레소");

  const category = (category) => {
    setMainCategory(category.mainCategory);
    setSubCategory(category.subCategory);
  };

  return (
    <Box maxWidth="1000px" mx={"auto"}>
      <Box>
        <Heading>List</Heading>
      </Box>
      <Divider border={"1px solid black"} my={4} />
      <CategoryTabComp category={category} />
      <ProductBodyComp
        branchName={branchName}
        branchId={branchId}
        mainCategory={mainCategory}
        subCategory={subCategory}
      />
    </Box>
  );
};
