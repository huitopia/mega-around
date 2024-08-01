import { Box, Heading } from "@chakra-ui/react";
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
    <Box>
      <Box
        height={"280px"}
        backgroundColor={"#444444"}
        textAlign={"center"}
        display={"flex"}
        alignItems={"center"}
        justifyContent="center"
      >
        <Box>
          <Heading size="2xl" textColor={"#FDD000"}>
            MEGA MENU
          </Heading>
        </Box>
      </Box>
      <Box maxWidth="1200px" mx={"auto"} mt={"50px"}>
        <CategoryTabComp category={category} />
        <ProductBodyComp
          branchId={branchId}
          mainCategory={mainCategory}
          subCategory={subCategory}
        />
      </Box>
    </Box>
  );
};
