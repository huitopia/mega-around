import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Divider,
  Flex,
  HStack,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Spinner,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { CustomToast } from "../../component/CustomToast.jsx";
import { OrderContext } from "../../order/component/OrderProvider.jsx";
import { LoginContext } from "../../component/LoginProvider.jsx";
import { CustomAlert } from "../../component/CustomAlert.jsx";

export const ProductDetailModal = ({ isOpen, onClose, productId }) => {
  const account = useContext(LoginContext);
  const [data, setData] = useState({
    id: 0,
    title: "",
    content: "",
    filePath: "",
    price: 0,
    options: [],
  });
  const [checkedItems, setCheckedItems] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [count, setCount] = useState(1);
  const navigate = useNavigate();
  const {
    isOpen: alertIsOpen,
    onOpen: alertOnOpen,
    onClose: alertOnClose,
  } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const { successToast, errorToast } = CustomToast();
  const directOrder = useContext(OrderContext);

  useEffect(() => {
    if (productId !== 0) {
      axios
        .get(`/api/products/${productId}`)
        .then((response) => {
          const { id, title, content, file_path, price, options } =
            response.data;
          if (response.data != null) {
            setData({
              id: id,
              title: title,
              content: content,
              filePath: file_path,
              price: price,
              options: options,
            });
            setTotalPrice(response.data.price);
          }
          console.log("Response: ", response.data);
        })
        .catch((error) => {
          errorToast("상품 상세 조회 실패");
          console.error("Error:", error);
        })
        .finally();
    }
  }, [productId]);

  const handleCheckboxChange = (optionId, itemId, itemPrice) => {
    itemPrice = count > 1 ? itemPrice * count : itemPrice;
    setCheckedItems((prevState) => {
      const prevItemId = prevState[optionId];
      const isCurrentlyChecked = prevItemId === itemId;

      let newTotalPrice = totalPrice;

      if (isCurrentlyChecked) {
        newTotalPrice -= itemPrice;
      } else {
        if (prevItemId) {
          const prevItem = data.options
            .find((option) => option.id === optionId)
            .option_item.find((item) => item.id === prevItemId);
          newTotalPrice -= prevItem.price;
        }
        newTotalPrice += itemPrice;
      }

      setTotalPrice(newTotalPrice);

      return {
        ...prevState,
        [optionId]: isCurrentlyChecked ? null : itemId,
      };
    });
  };

  const handleCountChange = (productCount) => {
    let prevPrice = totalPrice / count;
    setTotalPrice(
      productCount < 0 ? totalPrice - prevPrice : totalPrice + prevPrice,
    );
    setCount(count + productCount);
  };

  const closeModal = () => {
    onClose();
    setCheckedItems({});
    setTotalPrice(0);
    setCount(1);
  };

  const handleUpdateButton = () => {
    onClose();
    navigate(`/product/${productId}`);
  };

  const handleDeleteButton = () => {
    if (account.hasAuth() !== "admin") {
      errorToast("접근 권한이 없습니다.");
      return navigate("/");
    }
    setLoading(true);
    axios
      .delete(`/api/products/${productId}`)
      .then(() => {
        successToast("상품 삭제 성공");
      })
      .catch((error) => {
        errorToast("상품 삭제 실패");
        console.error("Error:", error);
      })
      .finally(() => {
        setLoading(false);
        alertOnClose();
        closeModal();
        window.location.reload();
      });
  };
  // -- spinner
  if (data == null) {
    return <Spinner />;
  }

  function handleAddCart() {
    axios
      .post("/api/carts", {
        // TODO. 나중에 변경
        branchId: branchId,
        totalPrice,
        cartProduct: [
          {
            productId,
            count,
            totalPrice: totalPrice / count,
            option: Object.values(checkedItems),
          },
        ],
      })
      .then(() => {
        successToast("상품을 장바구니에 담았습니다");
        onClose();
      })
      .catch(() => errorToast("오류 : 장바구니 담기에 실패했습니다"))
      .finally(() => {
        setCheckedItems({});
        setCount(1);
      });
  }

  function handleOrder() {
    const option = Object.values(checkedItems);
    const optionList = option.map((id) => {
      for (const option of data.options) {
        const selectedItem = option.option_item.find((item) => item.id === id);
        if (selectedItem) {
          return selectedItem.content;
        }
      }
    });

    directOrder.setItem({
      branchId: branchId,
      branchName: "메가커피",
      totalPrice,
      orderProduct: [
        {
          count: count,
          filePath: data.filePath,
          option: option,
          optionList: optionList,
          productId,
          productName: data.title,
          totalPrice: totalPrice / count,
        },
      ],
    });
    console.log(directOrder.item);
    navigate("/order?type=order");
  }

  return (
    <Modal onClose={closeModal} isOpen={isOpen} size={"xl"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign={"center"} fontSize={"2xl"} mt={"30px"}>
          MEGA MENU
        </ModalHeader>
        <ModalCloseButton />
        <VStack hidden={account.hasAuth() !== "admin"}>
          <ButtonGroup size="sm">
            <Button onClick={handleUpdateButton}>
              {/* 수정하기 */}
              <FontAwesomeIcon icon={faPenToSquare} />
            </Button>
            <Button
              onClick={() => {
                alertOnOpen();
              }}
            >
              {/* 삭제하기 */}
              <FontAwesomeIcon icon={faTrashCan} />
            </Button>
          </ButtonGroup>
        </VStack>
        <ModalBody align={"center"}>
          <VStack spacing={4}>
            <Image
              height={"300px"}
              objectFit="cover"
              src={`https://huistudybucket01.s3.ap-northeast-2.amazonaws.com/${data.filePath}`}
            />
            <Text w={"80%"} fontSize={"2xl"} as={"b"} mt={"20px"}>
              {data.title}
            </Text>
            <Text w={"80%"} mt={"20px"}>
              {data.content}
            </Text>
            <Divider orientation="horizontal" mt={"20px"} />
            <Text w={"80%"} as={"b"} fontSize={"xl"} mt={"20px"}>
              퍼스널옵션
            </Text>
          </VStack>
          <Accordion allowMultiple align="stretch" mt={"20px"}>
            {data.options.map((option) => (
              <AccordionItem key={option.id}>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left" as={"span"}>
                      {option.title}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <VStack align="start">
                    {option.option_item.map((item) => (
                      <Checkbox
                        key={item.id}
                        value={item.id}
                        id={item.optionId}
                        isChecked={checkedItems[option.id] === item.id}
                        onChange={() =>
                          handleCheckboxChange(option.id, item.id, item.price)
                        }
                        colorScheme={"gray"}
                      >
                        {item.content} +{item.price}원
                      </Checkbox>
                    ))}
                  </VStack>
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
          <Flex justifyContent={"space-between"} align={"center"} mt={"20px"}>
            <Box>
              <HStack maxW="200px">
                <Button
                  colorScheme={"pink"}
                  isDisabled={count < 2}
                  onClick={() => handleCountChange(-1)}
                >
                  -
                </Button>
                <Input value={count} readOnly />
                <Button
                  colorScheme={"pink"}
                  onClick={() => handleCountChange(1)}
                >
                  +
                </Button>
              </HStack>
            </Box>
            <Box mr={"100px"}>
              <Text fontSize={"xl"} as={"b"}>
                {totalPrice} 원
              </Text>
            </Box>
          </Flex>
        </ModalBody>
        <ModalFooter justifyContent="center">
          <Button colorScheme={"pink"} onClick={handleOrder} width={"30%"}>
            바로 주문
          </Button>
          <Spacer />
          <Button colorScheme={"orange"} onClick={handleAddCart} width={"30%"}>
            장바구니 담기
          </Button>
          <Spacer />
          <Button onClick={onClose} width={"30%"}>
            닫기
          </Button>
        </ModalFooter>
      </ModalContent>
      <CustomAlert
        isOpen={alertIsOpen}
        onClose={alertOnClose}
        alertHeader={"상품 삭제"}
        alertBody={`${data.title} 상품을 삭제하시겠습니까?`}
        onClick={handleDeleteButton}
        isLoading={loading}
        alertButtonContent={"Delete"}
        buttonColor={"red"}
      />
    </Modal>
  );
};
