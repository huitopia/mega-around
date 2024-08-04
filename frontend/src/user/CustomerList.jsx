import {
  Box,
  Button,
  Center,
  Flex,
  Input,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

<Center>
  <Table w={400} mt={5}>
    <Tr>
      <Th>id</Th>
      <Th>이메일</Th>
      <Th>닉네임</Th>
      <Th>가입일시</Th>
    </Tr>
    {/*<Tr>{customerList.email}</Tr>*/}
    {/*<Tr>{customerList.nickName}</Tr>*/}
    {/*<Tr>{customerList.createdAt}</Tr>*/}
    <Tr></Tr>
  </Table>
</Center>;

export function CustomerList() {
  const [customerList, setCustomerList] = useState(null);
  const navigate = useNavigate();
  const [pageInfo, setPageInfo] = useState({});
  const [searchType, setSearchType] = useState("all");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchParams] = useSearchParams();

  useEffect(() => {
    axios.get(`/api/user/admin/customer/list?${searchParams}`).then((res) => {
      setCustomerList(res.data.customerList);
      setPageInfo(res.data.pageInfo);
    });

    setSearchType("all");
    setSearchKeyword("");
    const typeParam = searchParams.get("type");
    const keywordParam = searchParams.get("keyword");
    if (typeParam) {
      setSearchType(typeParam);
    }
    if (keywordParam) {
      setSearchKeyword(keywordParam);
    }
  }, [searchParams]);

  const pageNumbers = [];
  for (let i = pageInfo.leftPageNumber; i <= pageInfo.rightPageNumber; i++) {
    pageNumbers.push(i);
  }

  if (customerList === null) {
    return <Spinner />;
  }

  function handlePageButtonClick(pageNumber) {
    searchParams.set("page", pageNumber);
    navigate(`/customer/list/?${searchParams}`);
  }

  function handleSearchClick() {
    navigate(`/customer/list/?type=${searchType}&keyword=${searchKeyword}`);
  }

  function handleTypeClick(type) {
    navigate(`/customer/list/?type=${type}&keyword=${searchKeyword}`);
  }

  return (
    <Box>
      <Flex gap={2}>
        <Link cursor={"pointer"} onClick={() => handleTypeClick("all")}>
          전체보기
        </Link>
      </Flex>
      <Center>
        <Table mt={5}>
          <Thead>
            <Tr>
              <Th>No.</Th>
              <Th>이메일</Th>
              <Th>닉네임</Th>
              <Th>가입일시</Th>
            </Tr>
          </Thead>
          <Tbody>
            {customerList.map((customer) => (
              <Tr key={customer.id}>
                <Td>{customer.id}</Td>
                <Td>{customer.email}</Td>
                <Td>{customer.nickName}</Td>
                <Td>{customer.createdAt.substring(0, 13)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Center>
      <Center mb={10} mt={10}>
        <Flex gap={3}>
          <Box>
            <Input
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="검색어"
            />
          </Box>
          <Box>
            <Button onClick={handleSearchClick} colorScheme={"pink"}>
              검색
            </Button>
          </Box>
        </Flex>
      </Center>
      <Center gap={3}>
        {pageNumbers.map((pageNumber) => (
          <Button
            key={pageNumber}
            borderWidth={2}
            _selected={"teal"}
            colorScheme={
              pageNumber - 1 === pageInfo.currentPageNumber ? "orange" : "pink"
            }
            variant="outline"
            onClick={() => handlePageButtonClick(pageNumber)}
          >
            {pageNumber}
          </Button>
        ))}
      </Center>
    </Box>
  );
}
