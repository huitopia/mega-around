import {
  Box,
  Card,
  CardBody,
  Image,
  SimpleGrid,
  Spinner,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ProductDetailModal } from "./ProductDetailModal.jsx";
import { CustomToast } from "../../component/CustomToast.jsx";

export function ProductBodyComp({
  branchId,
  mainCategory,
  subCategory,
  branchName,
}) {
  const [data, setData] = useState([]);
  const [productId, setProductId] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { successToast, errorToast } = CustomToast();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`/api/products/list?main=${mainCategory}&sub=${subCategory}`)
      .then((response) => {
        if (response.data != null) {
          setData(response.data);
        }
      })
      .catch((error) => {
        errorToast("상품 조회 중 문제가 발생하였습니다.");
        console.error("Error:", error);
      })
      .finally();
  }, [mainCategory, subCategory]);

  // -- spinner
  if (data == null) {
    return <Spinner />;
  }

  return (
    <Box mt={"50px"}>
      <SimpleGrid templateColumns="repeat(4, 1fr)" gap={6}>
        {data.map((product) => (
          <Card
            width={"250px"}
            value={product.id}
            key={product.id}
            height={"380px"}
            _hover={{
              cursor: "pointer",
              filter: "auto",
              brightness: "95%",
            }}
            onClick={() => {
              setProductId(product.id);
              onOpen();
            }}
            mb={"20px"}
          >
            <CardBody>
              <VStack spacing={4}>
                <Box overflow={"hidden"}>
                  <Image
                    height={"240px"}
                    objectFit="cover"
                    src={`https://huistudybucket01.s3.ap-northeast-2.amazonaws.com/${product.file_path}`}
                    transition={"transform 0.3s ease"}
                    _hover={{
                      transform: "scale(1.15)",
                    }}
                  />
                </Box>
                <Text
                  fontSize="lg"
                  as={"b"}
                  w={"100%"}
                  height={"30px"}
                  textAlign={"center"}
                  overflow={"hidden"}
                >
                  {product.title}
                </Text>
                <Text as={"b"}>{product.price} 원</Text>
              </VStack>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
      <ProductDetailModal
        isOpen={isOpen}
        onClose={onClose}
        productId={productId}
        branchId={branchId}
        branchName={branchName}
      />
    </Box>
  );
}
