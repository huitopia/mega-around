import { createContext, useState } from "react";

export const OrderContext = createContext({});

export function OrderProvider({ children }) {
  const [id, setId] = useState(1);
  const [count, setCount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [option, setOption] = useState([]);

  return (
    <OrderContext.Provider
      value={{
        id,
        setId,
        count,
        setCount,
        totalPrice,
        setTotalPrice,
        option,
        setOption,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}
