import { Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

export function ProductDetail() {
  const { productId } = useParams();
  return <Box>{productId}</Box>;
}
