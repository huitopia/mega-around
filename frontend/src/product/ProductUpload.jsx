import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Img,
  Input,
  InputGroup,
  InputRightAddon,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { CategoryComp } from "./component/CategoryComp.jsx";
import { useState } from "react";
import { OptionComp } from "./component/OptionComp.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function ProductUpload() {
  // const [product, setProduct] = useState({
  //   title: "",
  //   content: "",
  //   mainCategory: "",
  //   subCategory: "",
  //   option: [],
  //   price: 0,
  // });
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mainCategory, setMainCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [option, setOption] = useState([]);
  const [price, setPrice] = useState(0);
  const [files, setFiles] = useState([]);
  const [imageSrc, setImageSrc] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  // TODO : admin 권한만 접근 가능하게 수정
  //  빈 값 전송 금지
  //  가격 0원 이하 전송 금지
  const handleSaveClick = () => {
    setLoading(true);
    axios
      .postForm("/api/products/add", {
        title,
        content,
        mainCategory,
        subCategory,
        option,
        price,
        files,
      })
      .then(() => {
        toast({
          title: "상품 등록 성공",
          status: "success",
          position: "top",
          duration: 1500,
          isClosable: true,
        });
        navigate("/");
      })
      .catch((error) => {
        toast({
          title: "상품 등록 실패",
          status: "error",
          position: "top",
          duration: 1500,
          isClosable: true,
        });
        console.error("Error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const category = (category) => {
    setMainCategory(category.mainCategory);
    setSubCategory(category.subCategory);
  };

  const options = (options) => {
    setOption(options);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const onUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImageSrc(reader.result || null); // 파일의 컨텐츠
    };
    setFiles(event.target.files);
  };

  return (
    <Box maxWidth="1000px" mx={"auto"}>
      <Box>
        <Heading>Upload</Heading>
      </Box>
      <Divider border={"1px solid black"} my={4} />
      <Box maxWidth="700px" mx={"auto"}>
        <Box>
          <FormControl>
            <FormLabel>썸네일</FormLabel>
            <Img src={imageSrc}></Img>
            <Input
              multiple
              type={"file"}
              accept="image/*"
              onChange={(event) => onUpload(event)}
            />
            <FormHelperText>
              총 용량은 10MB, 한 파일은 1MB를 초과할 수 없습니다.
            </FormHelperText>
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>상품명</FormLabel>
            <Input
              type="text"
              placeholder={"30자 이내 작성"}
              onChange={handleTitleChange}
            />
          </FormControl>
        </Box>
        <Box>
          <CategoryComp category={category} />
        </Box>
        <Box>
          <FormControl>
            <FormLabel>퍼스널 옵션</FormLabel>
            <Textarea
              type="text"
              placeholder={"100자 이내 작성"}
              onChange={handleContentChange}
            />
          </FormControl>
        </Box>
        <Box>
          <OptionComp options={options} />
        </Box>
        <Box maxWidth="60%">
          <FormControl>
            <FormLabel>가격</FormLabel>
            <InputGroup size="sm">
              <Input type="number" onChange={handlePriceChange} />
              <InputRightAddon>원</InputRightAddon>
            </InputGroup>
            <FormHelperText>가격은 0원 이상부터 가능합니다.</FormHelperText>
          </FormControl>
        </Box>
        <Box>
          <Center>
            <ButtonGroup variant="outline">
              <VStack>
                <Button
                  isLoading={loading}
                  colorScheme={"blue"}
                  width={"200px"}
                  onClick={handleSaveClick}
                >
                  Save
                </Button>
                <Button
                  colorScheme={"gray"}
                  width={"200px"}
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
              </VStack>
            </ButtonGroup>
          </Center>
        </Box>
      </Box>
    </Box>
  );
}
