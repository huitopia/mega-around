import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
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
  Text,
  useNumberInput,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";

export function ProductDetailModal({ isOpen, onClose, productId }) {
  const [data, setData] = useState({
    id: 0,
    title: "",
    content: "",
    filePath: "",
    price: 0,
    options: [],
  });
  const [checkedItems, setCheckedItems] = useState({});

  useEffect(() => {
    if (productId !== 0) {
      axios
        .get(`/api/products/${productId}`)
        .then((response) => {
          const { id, title, content, file_path, price, options } =
            response.data;
          if (response.data != null) {
            console.log(response.data);
            setData({
              id: id,
              title: title,
              content: content,
              filePath: file_path,
              price: price,
              options: options,
            });
          }
        })
        .catch()
        .finally();
    }
  }, [productId]);

  const handleCheckboxChange = (optionId, itemId) => {
    setCheckedItems((prevState) => ({
      ...prevState,
      [optionId]: prevState[optionId] === itemId ? null : itemId,
    }));
  };

  const closeModal = () => {
    onClose();
    setCheckedItems({});
  };

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 1,
      min: 1,
      max: 20,
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  return (
    <Modal onClose={closeModal} isOpen={isOpen} size={"xl"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign={"center"}>{data.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody align={"center"}>
          <VStack spacing={4}>
            <Image
              height={"250px"}
              border={"1px solid red"}
              objectFit="cover"
              src={`https://huistudybucket01.s3.ap-northeast-2.amazonaws.com/${data.filePath}`}
            />
            <Text w={"80%"} fontSize={"xl"} as={"b"}>
              {data.title}
            </Text>
            <Text w={"80%"}>{data.content}</Text>
            <Divider orientation="horizontal" />
            <Text w={"80%"} fontSize={"lg"} as={"b"}>
              퍼스널 옵션
            </Text>
          </VStack>
          <Accordion allowMultiple align="stretch" mt={"20px"}>
            {data.options.map((option) => (
              <AccordionItem key={option.id}>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
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
                          handleCheckboxChange(option.id, item.id)
                        }
                      >
                        {item.content} {item.price}원
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
                <Button {...dec}>-</Button>
                <Input {...input} />
                <Button {...inc}>+</Button>
              </HStack>
            </Box>
            <Box mr={"100px"}>
              <Text fontSize={"lg"} as={"b"}>
                {data.price}
              </Text>
            </Box>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
