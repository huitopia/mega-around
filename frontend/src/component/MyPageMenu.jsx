import React, { useContext } from "react";
import { Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "./LoginProvider.jsx";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function MyPageMenu(props) {
  const navigate = useNavigate();
  const account = useContext(LoginContext);
  console.log("MyPageMenu rendered"); // 디버깅용 로그 추가
  return (
    <Menu>
      <MenuButton as={Text} cursor={"pointer"}>
        {account.nickName}
        {account.branchName}&nbsp;님&nbsp;&nbsp;
        <FontAwesomeIcon icon={faCaretDown} />
      </MenuButton>
      <MenuList>
        {account.hasAuth() === "customer" && (
          <>
            <MenuItem onClick={() => navigate("/stamp")}>스탬프</MenuItem>
            <MenuItem onClick={() => navigate("/coupon")}>쿠폰</MenuItem>
            <MenuItem onClick={() => navigate(`/order/list`)}>
              주문 내역
            </MenuItem>
            <MenuItem
              onClick={() => navigate(`/mypage/customer/${account.id}`)}
            >
              내 정보
            </MenuItem>
          </>
        )}
        {account.hasAuth() === "branch" && (
          <MenuItem onCLick={() => navigate(`/mapage/branch/${account.id}`)}>
            내 정보(지점)
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  );
}

export default MyPageMenu;
