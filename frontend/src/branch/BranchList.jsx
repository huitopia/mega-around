import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  SimpleGrid,
  Spacer,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

export const BranchList = () => {
  // const kakao_javasciprt_key = import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY;

  // 현재 위치
  const [location, setLocation] = useState(null);
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

      const markerPosition = new window.kakao.maps.LatLng(
        location.latitude,
        location.longitude,
      );
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
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
                <Card key={branch.branchId} height={"120px"}>
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
    </Box>
  );
};
