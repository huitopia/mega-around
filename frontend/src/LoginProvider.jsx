import { createContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const LoginContext = createContext(null);

export function LoginProvider({ children }) {
  // email,nickName,branchName,isLoggedIn,hasAccess,login,logout
  const [email, setEmail] = useState("");
  const [nickName, setNickName] = useState("");
  const [branchName, setBranchName] = useState("");
  const [address, setAddress] = useState("");
  const [subAddress, setSubAddress] = useState("");
  const [expired, setExpired] = useState(0);

  function isLoggedIn() {
    // 토큰이 있고 유효하면 로그인
    return Date.now() / 1000 < expired;
  }

  function login(token) {
    localStorage.setItem("token", token);
    const payload = jwtDecode(token);
    setExpired(payload.exp);
    setEmail(payload.sub);
    setNickName(payload.nickName);
    setBranchName(payload.branchName);
    setAddress(payload.address);
    setSubAddress(payload.subAddress);
  }

  function logout() {
    localStorage.removeItem("token");
    setExpired(0);
    setEmail("");
    setNickName("");
    setBranchName("");
    setAddress("");
    setSubAddress("");
  }

  return (
    <LoginContext.Provider
      value={{
        email,
        nickName,
        branchName,
        address,
        subAddress,
        login,
        logout,
        isLoggedIn,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}
