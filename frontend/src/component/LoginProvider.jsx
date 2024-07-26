import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const LoginContext = createContext(null);

export function LoginProvider({ children }) {
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [nickName, setNickName] = useState("");
  const [branchName, setBranchName] = useState("");
  const [auth, setAuth] = useState("");
  const [address, setAddress] = useState("");
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
    setAuth(payload.scope);
    setAddress(payload.address);
  }

  function logout() {
    localStorage.removeItem("token");
    setExpired(0);
    setAuth("");
    setId("");
    setEmail("");
    setNickName("");
    setBranchName("");
    setAddress("");
  }

  function hasAccess(param) {
    return id == param; // 타입이 달라도 값이 같으면 같게 인식
  }

  // 권한 admin, customer, branch
  function hasAuth() {
    if (auth.includes("admin")) {
      return "admin";
    } else if (auth.includes("customer")) {
      return "customer";
    } else return "branch";
  }

  return (
    <LoginContext.Provider
      value={{
        id,
        email,
        nickName,
        branchName,
        address,
        login,
        logout,
        isLoggedIn,
        hasAccess,
        hasAuth,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}
