import React, { useContext, useEffect } from "react";
import { Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "./LoginProvider.jsx";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Client } from "@stomp/stompjs";

function MyPageMenu(props) {
  const navigate = useNavigate();
  const account = useContext(LoginContext);
  console.log("MyPageMenu rendered"); // 디버깅용 로그 추가
  useEffect(() => {
    const stompClient = new Client({
      brokerURL: "ws://localhost:8080/ws",
      connectHeaders: {},
      debug: (str) => {
        console.log(str);
      },
      reconnectDelay: 10000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: (frame) => {
        console.log("WebSocket 연결이 열렸습니다.");

        // 연결이 성공적으로 이루어진 후에 구독을 설정합니다.
        stompClient.subscribe(`/sub/${account.id}`, (message) => {
          if (message.body) {
            let displayMessage;
            switch (message.body) {
              case "2":
                displayMessage =
                  "주문을 확인했습니다. 5분 후에 제조가 완료될 예정입니다.";
                break;
              case "3":
                displayMessage =
                  "제조를 완료했습니다. 1시간 내에 수령해주세요.";
                break;
              default:
                displayMessage = "오류가 발생했습니다";
            }

            alert(displayMessage);
          }
        });
      },
      onStompError: (frame) => {
        console.error("STOMP 오류:", frame);
      },
    });

    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, []);

  return (
    <Menu>
      <MenuButton as={Text} cursor={"pointer"}>
        {account.nickName}
        {account.branchName}&nbsp;님&nbsp;&nbsp;
        <FontAwesomeIcon icon={faCaretDown} />
      </MenuButton>

      <MenuList fontSize={"14px"} width="200px">
        {account.hasAuth() === "customer" && (
          <>
            <MenuItem onClick={() => navigate("/stamp")}>스탬프</MenuItem>
            <MenuItem onClick={() => navigate("/coupon")}>쿠폰</MenuItem>
            <MenuItem onClick={() => navigate(`/cart`)}>장바구니</MenuItem>
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
          <MenuItem onClick={() => navigate(`/mypage/branch/${account.id}`)}>
            내 정보(지점)
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  );
}

export default MyPageMenu;
