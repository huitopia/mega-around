import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  SimpleGrid,
  Spacer,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

export const BranchList = () => {
  const kakao_javasciprt_key = import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY;

  // 현재 위치
  const [location, setLocation] = useState(null);
  const [stores, setStores] = useState([]);
  const [branches, setBranches] = useState([]);
  const [error, setError] = useState(null);

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
              setStores(response.data);
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

      const markerPosition = new window.kakao.maps.LatLng(
        location.latitude,
        location.longitude,
      );
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
      });

      marker.setMap(map);

      stores.forEach((store) => {
        const storePosition = new window.kakao.maps.LatLng(
          store.latitude,
          store.longitude,
        );
        const storeMarker = new window.kakao.maps.Marker({
          position: storePosition,
        });
        storeMarker.setMap(map);
      });
    }
  }, [location, stores]);
  console.log("store: ", stores);
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
            <SimpleGrid
              spacing={4}
              columns={2}
              // templateColumns="repeat(auto-fill, minmax(400px, 1fr))"
              // templateColumns="repeat(2, 1fr)"
            >
              {stores.map((store) => (
                <Card key={store.branchId} height={"120px"}>
                  <CardHeader>
                    <Heading size={"md"}>{store.branchName}</Heading>
                  </CardHeader>
                  <CardBody>
                    <Flex>
                      <Box>{store.address}</Box>
                      <Spacer />
                      <Box textColor={"red"}>거리</Box>
                    </Flex>
                  </CardBody>
                </Card>
              ))}
            </SimpleGrid>
          </Box>
        </>
      )}
    </Box>
  );
};
