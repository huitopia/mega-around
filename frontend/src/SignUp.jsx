import { Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

export function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSignup() {
    axios.post("/api/user/customer", { email, password }).then().catch();
  }

  return (
    <>
      고객 회원가입
      <Input onChange={(e) => setEmail(e.target.value)}>이메일</Input>
      <Input onChange={(e) => setPassword(e.target.value)}>비밀번호</Input>
      <Button onClick={handleSignup}>회원가입</Button>
    </>
  );
}
