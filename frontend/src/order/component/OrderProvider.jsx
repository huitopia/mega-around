import { createContext, useState } from "react";

export const OrderContext = createContext({});

export function OrderProvider({ children }) {
  const [productId, setProductId] = useState(1);
  const [productName, setProductName] = useState("");
  const [title, setTitle] = useState("");
  const [count, setCount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [option, setOption] = useState([]);
  const [optionList, setOptionList] = useState([]);
  const [src, setSrc] = useState("");
  const [branchName, setBranchName] = useState("");
  const [branchId, setBranchId] = useState(1);

  return (
    <OrderContext.Provider
      value={{
        productId,
        setProductId,
        title,
        setTitle,
        count,
        setCount,
        totalPrice,
        setTotalPrice,
        // option_item.id List
        option,
        setOption,
        // option_item.content List
        optionList,
        setOptionList,
        src,
        setSrc,
        branchName,
        setBranchName,
        branchId,
        setBranchId,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}
