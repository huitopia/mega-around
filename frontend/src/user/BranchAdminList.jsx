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
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

export function BranchAdminList() {
  const [branchList, setBranchList] = useState(null);
  const navigate = useNavigate();
  const [pageInfo, setPageInfo] = useState({});
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    axios.get(`/api/user/admin/branch/list?${searchParams}`).then((res) => {
      setBranchList(res.data.branchList);
      setPageInfo(res.data.pageInfo);
    });

    setSearchKeyword("");
    const keywordParam = searchParams.get("keyword");
    if (keywordParam) {
      setSearchKeyword(keywordParam);
    }
  }, [searchParams]);

  const pageNumbers = [];
  for (let i = pageInfo.leftPageNumber; i <= pageInfo.rightPageNumber; i++) {
    pageNumbers.push(i);
  }

  if (branchList === null) {
    return <Spinner />;
  }

  function handlePageButtonClick(pageNumber) {
    setSearchParams({ ...Object.fromEntries(searchParams), page: pageNumber });
  }

  function handleSearchClick() {
    setSearchParams({ keyword: searchKeyword, page: 1 });
  }

  return (
    <Box>
      <Center>
        <Table mt={5}>
          <Thead>
            <Tr>
              <Th>No.</Th>
              <Th>이메일</Th>
              <Th>지점명</Th>
              <Th>주소</Th>
              <Th>가입일시</Th>
            </Tr>
          </Thead>
          <Tbody>
            {branchList.map((branch) => (
              <Tr key={branch.id}>
                <Td>{branch.id}</Td>
                <Td>{branch.email}</Td>
                <Td>{branch.branchName}</Td>
                <Td>{branch.address}</Td>
                <Td>{branch.createdAtAll}</Td>
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
            colorScheme={
              pageNumber - 1 === pageInfo.currentPageNumber ? "orange" : "pink"
            }
            onClick={() => handlePageButtonClick(pageNumber)}
          >
            {pageNumber}
          </Button>
        ))}
      </Center>
    </Box>
  );
}
