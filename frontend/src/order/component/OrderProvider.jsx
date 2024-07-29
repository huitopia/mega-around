import { createContext, useState } from "react";

export const OrderContext = createContext({});

export function OrderProvider({ children }) {
  const [item, setItem] = useState(null);

  return (
    <OrderContext.Provider
      value={{
        item,
        setItem,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}
