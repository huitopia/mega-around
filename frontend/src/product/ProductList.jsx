import { Box, Divider, Heading } from "@chakra-ui/react";
import { CategoryTabComp } from "./component/CategoryTabComp.jsx";
import { useState } from "react";
import { ProductBodyComp } from "./component/ProductBodyComp.jsx";

export function ProductList() {
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
      <ProductBodyComp mainCategory={mainCategory} subCategory={subCategory} />
    </Box>
  );
}
