"use client";

import React, { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [isLoggingOut, setLoggingOut] = useState(false);

  return (
    <AppContext.Provider value={{ isLoggingOut, setLoggingOut }}>
      {children}
    </AppContext.Provider>
  );
};
