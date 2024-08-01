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
  HStack,
  Img,
  Input,
  NumberInput,
  NumberInputField,
  Textarea,
} from "@chakra-ui/react";
import { CategoryComp } from "./component/CategoryComp.jsx";
import { useContext, useEffect, useState } from "react";
import { OptionComp } from "./component/OptionComp.jsx";
import { useNavigate } from "react-router-dom";
import { CustomToast } from "../component/CustomToast.jsx";
import { LoginContext } from "../component/LoginProvider.jsx";
import axios from "axios";

export const ProductUpload = () => {
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
  const { successToast, errorToast } = CustomToast();
  const account = useContext(LoginContext);

  useEffect(() => {
    if (account.hasAuth() !== "admin") {
      errorToast("접근 권한이 없습니다.");
      return navigate("/");
    }
  }, []);

  const handleSaveClick = () => {
    setLoading(true);
    if (!checkValidation()) {
      setLoading(false);
      return false;
    }
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
        successToast("상품 등록 성공");
        navigate("/product/list");
      })
      .catch((error) => {
        errorToast("상품 등록 실패");
        console.error("Error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const checkValidation = () => {
    if (title.length === 0 && title.length <= 30) {
      errorToast("상품명은 30자 이내로 입력해주세요.");
      return false;
    }
    if (mainCategory.length === 0 || subCategory.length === 0) {
      errorToast("카테고리를 선택해주세요.");
      return false;
    }
    if (content.length === 0 && content.length <= 100) {
      errorToast("상세 내용을 100자 이내로 입력해주세요.");
      return false;
    }
    if (option.length === 0) {
      errorToast("퍼스널 옵션을 선택해주세요.");
      return false;
    }
    if (price >= 0) {
      errorToast("가격을 입력해주세요.");
      return false;
    }
    return true;
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
    <Box maxWidth="1200px" mx={"auto"}>
      <Box mt={"60px"} mb={"60px"}>
        <Center>
          <Heading size={"xl"}>상품 등록</Heading>
        </Center>
      </Box>
      <Divider />
      <Box maxWidth="700px" mx={"auto"}>
        <Box mt={"40px"}>
          <FormControl>
            <Center hidden={imageSrc === null}>
              <Img src={imageSrc} height={"300px"}></Img>
            </Center>
            <FormLabel mt={"20px"}>썸네일</FormLabel>
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
        <Box mt={"25px"}>
          <FormControl>
            <FormLabel>상품명</FormLabel>
            <Input
              type="text"
              placeholder={"30자 이내 작성"}
              onChange={handleTitleChange}
            />
          </FormControl>
        </Box>
        <Box mt={"25px"}>
          <CategoryComp category={category} />
        </Box>
        <Box mt={"25px"}>
          <FormControl>
            <FormLabel>상세 내용</FormLabel>
            <Textarea
              type="text"
              placeholder={"100자 이내 작성"}
              onChange={handleContentChange}
            />
          </FormControl>
        </Box>
        <Box mt={"25px"}>
          <OptionComp options={options} />
        </Box>
        <Box maxWidth="60%" mt={"25px"}>
          <FormControl>
            <FormLabel>가격</FormLabel>
            <NumberInput defaultValue={0} min={0} max={100000}>
              <NumberInputField onChange={handlePriceChange} />
            </NumberInput>
            <FormHelperText>
              가격은 0원 이상부터 입력 가능합니다.
            </FormHelperText>
          </FormControl>
        </Box>
        <Box mt={"50px"}>
          <Center>
            <ButtonGroup variant="solid">
              <HStack>
                <Button
                  isLoading={loading}
                  colorScheme={"orange"}
                  width={"200px"}
                  onClick={handleSaveClick}
                >
                  Save
                </Button>
                <Button
                  colorScheme={"pink"}
                  width={"200px"}
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
              </HStack>
            </ButtonGroup>
          </Center>
        </Box>
      </Box>
    </Box>
  );
};
