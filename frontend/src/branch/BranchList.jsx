import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Spacer,
  Spinner,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../component/LoginProvider.jsx";

export const BranchList = () => {
  const account = useContext(LoginContext);
  const [location, setLocation] = useState(null);
  const [selectedBranchId, setSelectedBranchId] = useState(0);
  const [selectedBranchName, setSelectedBranchName] = useState("");
  const [branchLocation, setBranchLocation] = useState(null);
  const [branches, setBranches] = useState([]);
  const [error, setError] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLocationAndStores = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });

            try {
              const response = await axios.get("/api/location", {
                params: { lat: latitude, lng: longitude },
              });
              setBranches(response.data);
            } catch (error) {
              setError(error.message);
            }
          },
          (err) => {
            setError(err.message);
          },
        );
      } else {
        setError("Geolocation is not supported by this browser.");
      }
    };

    fetchLocationAndStores();
  }, []);

  useEffect(() => {
    if (location) {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(
          location.latitude,
          location.longitude,
        ),
        level: 4,
      };
      const map = new window.kakao.maps.Map(container, options);

      const position = new window.kakao.maps.LatLng(
        location.latitude,
        location.longitude,
      );
      // 현재 위치 마커 아이콘 설정
      const currentMarkerImage = new window.kakao.maps.MarkerImage(
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png", // 커스텀 아이콘 URL
        new window.kakao.maps.Size(24, 35), // 마커 이미지 크기
      );

      const marker = new window.kakao.maps.Marker({
        position: position,
        image: currentMarkerImage,
      });

      marker.setMap(map);

      branches.forEach((branch) => {
        const position = new window.kakao.maps.LatLng(
          branch.latitude,
          branch.longitude,
        );
        const marker = new window.kakao.maps.Marker({
          position: position,
        });
        marker.setMap(map);

        // CustomOverlay 생성 및 스타일 설정
        const content = `<span class="left"></span><span class="center" style="background-color: rgba(5,5,5,0.68); border: 2px solid #401f02; padding: 5px; border-radius: 15px; color: #f8f8f8; font-weight: 500;">${branch.branchName}</span><span class="right"></span>`;

        const customOverlay = new window.kakao.maps.CustomOverlay({
          position: position,
          content: content,
          xAnchor: 0.5,
          yAnchor: 3,
        });

        // mouseover - CustomOverlay 표시
        window.kakao.maps.event.addListener(marker, "mouseover", () => {
          customOverlay.setMap(map);
        });

        // mouseout - CustomOverlay 닫기
        window.kakao.maps.event.addListener(marker, "mouseout", () => {
          customOverlay.setMap(null);
        });

        // click- CustomOverlay 표시, 상태 업데이트, modal open
        window.kakao.maps.event.addListener(marker, "click", () => {
          customOverlay.setMap(map);
          handleModalOpen(
            branch.branchId,
            branch.branchName,
            branch.latitude,
            branch.longitude,
          );
        });
      });
    }
  }, [location, branches]);

  const handleModalOpen = (branchId, branchName, latitude, longitude) => {
    setSelectedBranchId(branchId);
    setSelectedBranchName(branchName);
    setBranchLocation({
      latitude: latitude,
      longitude: longitude,
    });
    onOpen();
  };

  useEffect(() => {
    if (branchLocation && isOpen) {
      setTimeout(() => {
        const staticPosition = new window.kakao.maps.LatLng(
          branchLocation.latitude,
          branchLocation.longitude,
        );

        const staticMarker = new window.kakao.maps.Marker({
          position: staticPosition,
        });

        const staticMapContainer = document.getElementById("staticMap");

        const staticMapOption = {
          center: new window.kakao.maps.LatLng(
            branchLocation.latitude,
            branchLocation.longitude,
          ),
          level: 3,
          marker: staticMarker,
        };

        const staticMap = new window.kakao.maps.Map(
          staticMapContainer,
          staticMapOption,
        );

        staticMarker.setMap(staticMap);
      }, 100); // 100ms 딜레이 추가
    }
  }, [branchLocation, isOpen]);

  return (
    <Box
      mt={"50px"}
      maxWidth="1000px"
      mx={"auto"}
      height="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      border="1px solid blue"
    >
      {error ? (
        <Text>{error}</Text>
      ) : !location ? (
        <Spinner size="xl" />
      ) : (
        <>
          <Box id="map" width={"100%"} height="50%" border="1px solid red" />
          <Box
            mt={"20px"}
            width={"100%"}
            height="50%"
            overflowY="auto"
            border="1px solid gray"
          >
            <SimpleGrid spacing={4} columns={2}>
              {branches.map((branch) => (
                <Card
                  key={branch.branchId}
                  height={"120px"}
                  backgroundColor={
                    branch.branchId === selectedBranchId && "yellow"
                  }
                  cursor={"pointer"}
                  _hover={{ backgroundColor: "yellow" }}
                  onClick={() => {
                    handleModalOpen(
                      branch.branchId,
                      branch.branchName,
                      branch.latitude,
                      branch.longitude,
                    );
                  }}
                >
                  <CardHeader>
                    <Text size={"md"} as={"b"}>
                      {branch.branchName}
                    </Text>
                  </CardHeader>
                  <CardBody>
                    <Flex>
                      <Box>
                        <Text>{branch.address}</Text>
                      </Box>
                      <Spacer />
                      <Box textColor={"red"}>
                        <Text>{branch.distance.toFixed()} m</Text>
                      </Box>
                    </Flex>
                  </CardBody>
                </Card>
              ))}
            </SimpleGrid>
          </Box>
        </>
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedBranchName}에서 주문하시겠습니까?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              <Box
                id={"staticMap"}
                width={"100%"}
                height={"200px"}
                border="1px solid red"
              />
              <Box mt={"20px"}>
                <Text color={"red"}>주문 확인 후 취소가 불가합니다.</Text>
              </Box>
            </VStack>
          </ModalBody>
          <ModalFooter justifyContent="center">
            <Button
              width={"40%"}
              colorScheme="pink"
              onClick={onClose}
              ml={"5%"}
            >
              취소
            </Button>
            <Spacer />
            <Button
              width={"40%"}
              colorScheme={"orange"}
              mr={"5%"}
              onClick={() => {
                if (account.hasAuth() === "customer") {
                  navigate(`/product/list?branchId=${selectedBranchId}`);
                } else {
                  alert("회원 로그인이 필요한 서비스입니다.");
                  navigate("/login");
                }
              }}
            >
              주문하기
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
