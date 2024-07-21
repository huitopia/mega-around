import React, { useState } from "react";
import axios from "axios";
import DaumPostcode from "react-daum-postcode";
import { Button, Heading, Input, useToast } from "@chakra-ui/react";

export function SignUpBranch() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [branchName, setBranchName] = useState("");
  const [address, setAddress] = useState("");
  const [subAddress, setSubAddress] = useState("");
  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);
  const toast = useToast();

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    setAddress(fullAddress);
    setSubAddress(extraAddress);
    setIsPostcodeOpen(false); // 주소 선택 후 팝업 닫기
    console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
  };

  function handleSignup() {
    axios
      .post("/api/user/branch", {
        email,
        password,
        branchName,
        address,
        subAddress,
      })
      .then(() =>
        toast({
          description: "지점 가입이 성공하였습니다.",
          status: "success",
          position: "top",
          duration: "2000",
        }),
      )
      .catch(() =>
        toast({
          description: "지점 가입이 실패하였습니다.",
          status: "error",
          position: "top",
          duration: "2000",
        }),
      );
  }

  return (
    <>
      <Heading>지점 회원가입</Heading>
      이메일
      <br />
      <Input type="email" onChange={(e) => setEmail(e.target.value)} />
      비밀번호
      <br />
      <Input type="password" onChange={(e) => setPassword(e.target.value)} />
      닉네임
      <br />
      <Input onChange={(e) => setBranchName(e.target.value)} />
      <br />
      주소
      <Button
        type="button"
        onClick={() => setIsPostcodeOpen(true)}
        borderRadius={0}
      >
        주소 검색
      </Button>
      {isPostcodeOpen && (
        <DaumPostcode
          onComplete={handleComplete}
          autoClose={false}
          style={{ width: "100%", height: "400px" }}
          scriptUrl="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
        />
      )}
      <br />
      <Input value={address + subAddress} readOnly />
      <Button onClick={handleSignup} colorScheme={"blue"} mt={5}>
        지점 회원가입
      </Button>
    </>
  );
}
