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
  Image,
  Input,
  NumberInput,
  NumberInputField,
  Textarea,
} from "@chakra-ui/react";
import { CategoryComp } from "./component/CategoryComp.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { OptionComp } from "./component/OptionComp.jsx";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { LoginContext } from "../component/LoginProvider.jsx";
import { CustomToast } from "../component/CustomToast.jsx";

export const ProductUpdate = () => {
  const params = useParams();
  const productId = params.productId;
  const account = useContext(LoginContext);
  const [loading, setLoading] = useState(false);
  const [option, setOption] = useState([]);
  const [mainCategory, setMainCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [price, setPrice] = useState(0);
  const [imgSrc, setImgSrc] = useState("");
  const [filePath, setFilePath] = useState("");
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();
  const { successToast, errorToast } = CustomToast();

  useEffect(() => {
    if (account.hasAuth() !== "admin") {
      errorToast("접근 권한이 없습니다.");
      navigate("/");
    }
    axios
      .get(`/api/products/${productId}`)
      .then((response) => {
        console.log("Response: ", response.data);
        if (response.data != null) {
          setTitle(response.data.title);
          setContent(response.data.content);
          setFilePath(response.data.file_path),
            setImgSrc(
              "https://huistudybucket01.s3.ap-northeast-2.amazonaws.com/" +
                response.data.file_path,
            );
          setPrice(response.data.price);
          response.data.options.map((option) => {
            setOption((prevState) => [...prevState, option.id]);
          });
          setMainCategory(response.data.main_category);
          setSubCategory(response.data.sub_category);
        }
      })
      .catch((error) => {
        errorToast("상품 상세 조회 실패");
        console.error("Error:", error);
      })
      .finally();
  }, []);

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
      setImgSrc(reader.result || null); // 파일의 컨텐츠
    };
    setFiles(event.target.files);
  };

  const handleUpdateClick = () => {
    setLoading(true);
    axios
      .putForm(`/api/products/${productId}`, {
        title,
        content,
        mainCategory,
        subCategory,
        option,
        price,
        filePath,
        files,
      })
      .then(() => {
        successToast("상품 수정 성공");
        navigate("/product/list");
      })
      .catch((error) => {
        errorToast("상품 수정 실패");
        console.error("Error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Box maxWidth="1000px" mx={"auto"}>
      <Box>
        <Heading>상품 수정</Heading>
      </Box>
      <Divider border={"1px solid black"} my={4} />
      <Box maxWidth="700px" mx={"auto"}>
        <Box mt={"40px"}>
          <FormControl>
            <Center>
              <Image
                height={"300px"}
                border={"1px solid red"}
                objectFit="cover"
                src={imgSrc}
              ></Image>
            </Center>
            <FormLabel mt={"15px"}>썸네일</FormLabel>
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
        <Box mt={"20px"}>
          <FormControl>
            <FormLabel>상품명</FormLabel>
            <Input
              type="text"
              placeholder={"30자 이내 작성"}
              value={title}
              onChange={handleTitleChange}
            />
          </FormControl>
        </Box>
        <Box mt={"20px"}>
          <CategoryComp
            category={category}
            checkMain={mainCategory}
            checkSub={subCategory}
          />
        </Box>
        <Box mt={"20px"}>
          <FormControl>
            <FormLabel>상세 내용</FormLabel>
            <Textarea
              type="text"
              placeholder={"100자 이내 작성"}
              value={content}
              onChange={handleContentChange}
            />
          </FormControl>
        </Box>
        <Box mt={"20px"}>
          <OptionComp options={options} option={option} />
        </Box>
        <Box maxWidth="60%" mt={"20px"}>
          <FormControl>
            <FormLabel>가격</FormLabel>
            <NumberInput value={price} min={0} max={100000}>
              <NumberInputField onChange={handlePriceChange} />
            </NumberInput>
            <FormHelperText>가격은 0원 이상부터 가능합니다.</FormHelperText>
          </FormControl>
        </Box>
        <Box mt={"40px"}>
          <Center>
            <ButtonGroup variant="solid">
              <HStack>
                <Button
                  isLoading={loading}
                  colorScheme={"orange"}
                  width={"200px"}
                  onClick={handleUpdateClick}
                >
                  Update
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
