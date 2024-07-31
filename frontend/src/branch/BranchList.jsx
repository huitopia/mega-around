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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const BranchList = () => {
  // const kakao_javasciprt_key = import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY;

  // 현재 위치
  const [location, setLocation] = useState(null);
  const [selectedBranchId, setSelectedBranchId] = useState(0);
  const [selectedBranchName, setSelectedBranchName] = useState("");
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
        level: 3,
      };
      const map = new window.kakao.maps.Map(container, options);

      const position = new window.kakao.maps.LatLng(
        location.latitude,
        location.longitude,
      );
      const marker = new window.kakao.maps.Marker({
        position: position,
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
        window.kakao.maps.event.addListener(marker, "click", () => {
          setSelectedBranchId(branch.branchId);
        });
      });
    }
  }, [location, branches]);

  console.log("branches: ", branches);

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
                    setSelectedBranchName(branch.branchName);
                    setSelectedBranchId(branch.branchId);
                    onOpen();
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
          <ModalBody textColor={"red"}>
            주문 확인 후 취소가 불가합니다.
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
                navigate(`/product/list?branchId=${selectedBranchId}`);
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
