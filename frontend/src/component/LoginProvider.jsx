import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const LoginContext = createContext(null);

export function LoginProvider({ children }) {
  // email,nickName,branchName,isLoggedIn,hasAccess,login,logout
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [nickName, setNickName] = useState("");
  const [branchName, setBranchName] = useState("");
  const [address, setAddress] = useState("");
  const [subAddress, setSubAddress] = useState("");
  const [expired, setExpired] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      login(token);
    }
  }, []);

  function isLoggedIn() {
    return Date.now() / 1000 < expired;
  }

  function login(token) {
    localStorage.setItem("token", token);
    const payload = jwtDecode(token);
    setExpired(payload.exp);
    setId(payload.sub);
    setEmail(payload.email);
    setNickName(payload.nickName);
    setBranchName(payload.branchName);
    setAddress(payload.address);
    setSubAddress(payload.subAddress);
  }

  function logout() {
    localStorage.removeItem("token");
    setExpired(0);
    setId("");
    setEmail("");
    setNickName("");
    setBranchName("");
    setAddress("");
    setSubAddress("");
  }

  function hasAccess(param) {
    return id == param; // 타입이 달라도 값이 같으면 같게 인식
  }

  return (
    <LoginContext.Provider
      value={{
        id,
        email,
        nickName,
        branchName,
        address,
        subAddress,
        login,
        logout,
        isLoggedIn,
        hasAccess,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}
