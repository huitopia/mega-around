import React, { useContext } from "react";
import { Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "./LoginProvider.jsx";

function MyPageMenu(props) {
  const navigate = useNavigate();
  const account = useContext(LoginContext);
  return (
    <Menu>
      <MenuButton as={Text} cursor={"pointer"}>
        마이페이지
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => navigate("/stamp")}>스탬프</MenuItem>
        <MenuItem onClick={() => navigate("/coupon")}>쿠폰</MenuItem>
        <MenuItem onClick={() => navigate(`/order/list`)}>주문 내역</MenuItem>
        <MenuItem onClick={() => navigate(`/mypage/${account.id}`)}>
          내 정보
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

export default MyPageMenu;
