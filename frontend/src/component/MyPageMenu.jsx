import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "./LoginProvider.jsx";
import { faBell, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Client } from "@stomp/stompjs";
import axios from "axios";

function MyPageMenu({ isChanged,setIsChanged, updateAlarm }) {
  const navigate = useNavigate();
  const account = useContext(LoginContext);
  const [noticeList, setNoticeList] = useState({});
  const [unreadNoticeCount, setUnreadNoticeCount] = useState(0);

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
          setUnreadNoticeCount(getUnreadNoticeCount(newNotice));
          setIsChanged(true);
          setIsChanged(false);
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
    if (account.isLoggedIn()) {
      axios.get(`/api/event/notice/${account.id}`).then((res) => {
        setNoticeList(res.data);
        setUnreadNoticeCount(getUnreadNoticeCount(res.data));
      });
    }
  }, [updateAlarm, isChanged]);

  function getUnreadNoticeCount(items){
    return items.reduce((count, item) => {
      if (!item.isRead) {
        count++;
      }
      return count;
    }, 0);
  }

  function handleReadNotice() {
    axios.put("/api/event/notice", {customerId : account.id}).then(() => setIsChanged(true));
  }

  return (
    <Flex>
      <Popover>
        <PopoverTrigger>
          <Flex alignItems={"center"} mr={2} gap={1} onClick={handleReadNotice}>
          <Box color={"white"} bg={"red"} w="20px" h={"20px"} borderRadius={"full"} fontSize={"sm"} textAlign={"center"}>{unreadNoticeCount}</Box>
          <FontAwesomeIcon icon={faBell} />
          </Flex>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            {noticeList && Object.keys(noticeList).length > 0 ? (
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
          {account.hasAuth() === "customer" || (
            <MenuItem onClick={() => navigate(`/product/list`)}>
              상품 리스트
            </MenuItem>
          )}
          {account.hasAuth() === "admin" && (
            <MenuItem onClick={() => navigate(`/product`)}>상품 등록</MenuItem>
          )}
        </MenuList>
      </Menu>
    </Flex>
  );
}

export default MyPageMenu;
