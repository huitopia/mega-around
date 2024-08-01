import React, {useContext, useEffect, useState} from "react";
import {
  Box, Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverArrow, PopoverBody, PopoverCloseButton,
  PopoverContent, PopoverHeader,
  PopoverTrigger,
  Text
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "./LoginProvider.jsx";
import {faBell, faCaretDown} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Client } from "@stomp/stompjs";
import axios from "axios";

function MyPageMenu({setIsChanged, updateAlarm}) {
  const navigate = useNavigate();
  const account = useContext(LoginContext);
  const [noticeList, setNoticeList] = useState({});

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
          const newNotice = JSON.parse(message.body);
          setNoticeList(newNotice);
          setIsChanged(true);
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

  useEffect(() => {
    if(account.isLoggedIn()){
      axios.get(`/api/event/notice/${account.id}`).then(res => {
        setNoticeList(res.data);
      });
    }
  }, [updateAlarm]);

  return (
    <Flex>
      <Popover>
        <PopoverTrigger>
          <FontAwesomeIcon icon={faBell} />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            {(noticeList && Object.keys(noticeList).length > 0) ? (
              noticeList.map((notice) => (
                <Box key={notice.id}>
                  <Box>{notice.content}</Box>
                </Box>
              ))
            ) : (
              <Box>보유한 공지가 없습니다.</Box>
            )}
          </PopoverBody>
        </PopoverContent>
      </Popover>
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
    </Flex>

  );
}

export default MyPageMenu;
