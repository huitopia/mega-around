import { Box, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export function BranchList() {
  const kakao_javasciprt_key = import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY;

  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakao_javasciprt_key}&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              setLocation({ latitude, longitude });
            },
            (err) => {
              setError(err.message);
            },
          );
        } else {
          setError("Geolocation is not supported by this browser.");
        }
      });
    };
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
    }
  }, [location]);

  return (
    <Box
      width="100%"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      {error ? (
        <Text>{error}</Text>
      ) : location ? (
        <Box id="map" width="100%" height="100%" />
      ) : (
        <Spinner size="xl" />
      )}
    </Box>
  );
}
