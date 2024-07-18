import { Button, Heading, Input, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

export function SignUpBranch() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [branchName, setBranchName] = useState("");
  const [address, setAddress] = useState("");
  const toast = useToast();

  const [postcode, setPostcode] = useState("");
  const [roadAddress, setRoadAddress] = useState("");
  const [jibunAddress, setJibunAddress] = useState("");
  const [extraAddress, setExtraAddress] = useState("");
  const [guide, setGuide] = useState("");

  function handleSignup() {
    axios
      .post("/api/user/branch", { email, password, branchName, address })
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

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      console.log("Daum script loaded");
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const sample4_execDaumPostcode = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        let roadAddr = data.roadAddress;
        let extraRoadAddr = "";

        if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
          extraRoadAddr += data.bname;
        }
        if (data.buildingName !== "" && data.apartment === "Y") {
          extraRoadAddr +=
            extraRoadAddr !== "" ? ", " + data.buildingName : data.buildingName;
        }
        if (extraRoadAddr !== "") {
          extraRoadAddr = " (" + extraRoadAddr + ")";
        }

        setPostcode(data.zonecode);
        setRoadAddress(roadAddr);
        setJibunAddress(data.jibunAddress);
        setExtraAddress(roadAddr !== "" ? extraRoadAddr : "");

        if (data.autoRoadAddress) {
          setGuide(
            "(예상 도로명 주소 : " + data.autoRoadAddress + extraRoadAddr + ")",
          );
        } else if (data.autoJibunAddress) {
          setGuide("(예상 지번 주소 : " + data.autoJibunAddress + ")");
        } else {
          setGuide("");
        }
      },
    }).open();
  };

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
      주소
      <br />
      <Input onChange={(e) => setAddress(e.target.value)} />
      <input
        type="text"
        id="sample4_postcode"
        placeholder="우편번호"
        value={postcode}
        readOnly
      />
      <input
        type="button"
        onClick={sample4_execDaumPostcode}
        value="우편번호 찾기"
      />
      <br />
      <input
        type="text"
        id="sample4_roadAddress"
        placeholder="도로명주소"
        value={roadAddress}
        style={{ width: "100px" }}
        readOnly
      />
      <input
        type="text"
        id="sample4_jibunAddress"
        placeholder="지번주소"
        value={jibunAddress}
        readOnly
      />
      <span
        id="guide"
        style={{ color: "#999", display: guide ? "block" : "none" }}
      >
        {guide}
      </span>
      <input type="text" id="sample4_detailAddress" placeholder="상세주소" />
      <input
        type="text"
        id="sample4_extraAddress"
        placeholder="참고항목"
        value={extraAddress}
        readOnly
      />
      <Button onClick={handleSignup} colorScheme={"blue"} mt={5}>
        지점 회원가입
      </Button>
    </>
  );
}
