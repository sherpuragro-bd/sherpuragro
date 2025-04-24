"use client";

import { createContext, useState } from "react";

export const AdminContext = createContext();

export const AdminContextProvider = ({ children }) => {
  const [selectedProducts, setselectedProducts] = useState([]);

  return (
    <AdminContext.Provider
      value={{
        selectedProducts,
        setselectedProducts,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
