import React from "react";
import { Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function MyPageMenu(props) {
  const navigate = useNavigate();

  return (
    <Menu>
      <MenuButton as={Text} cursor={"pointer"}>
        마이페이지
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => navigate("/stamp")}>스탬프</MenuItem>
        <MenuItem onClick={() => navigate("/coupon")}>쿠폰</MenuItem>
        <MenuItem onClick={() => navigate(`/order/list`)}>주문 내역</MenuItem>
        <MenuItem onClick={() => navigate(`/cart`)}>장바구니</MenuItem>
      </MenuList>
    </Menu>
  );
}

export default MyPageMenu;
