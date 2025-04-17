"use client";

import { createContext, useEffect, useState } from "react";

export const ShopContext = createContext();

export const ShopContextProvider = ({ children }) => {
  const [cartItems, setcartItems] = useState([]);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setcartItems(storedItems);
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const removeItemFromCart = (permalLink) => {
    setcartItems((prevItems) =>
      prevItems.filter((item) => item.permalLink !== permalLink)
    );
  };

  const addItemToCart = ({ permalLink, name, price, quantity = 1, image }) => {
    setcartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.permalLink === permalLink
      );

      if (existingItem) {
        return prevItems.map((item) =>
          item.permalLink === permalLink
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          ...prevItems,
          {
            permalLink,
            name,
            price,
            quantity,
            image,
          },
        ];
      }
    });
  };

  return (
    <ShopContext.Provider
      value={{
        cartItems,
        setcartItems,
        removeItemFromCart,
        addItemToCart,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
