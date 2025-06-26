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

  const cartTotalPrice = cartItems?.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const updateProductQuanity = (permalLink, quantity) => {
    if (quantity < 1) {
      return;
    }

    if (quantity > 1000) {
      return;
    }

    setcartItems((prevItems) =>
      prevItems.map((item) =>
        item.permalLink === permalLink ? { ...item, quantity } : item
      )
    );
  };

  return (
    <ShopContext.Provider
      value={{
        cartItems,
        setcartItems,
        removeItemFromCart,
        addItemToCart,
        updateProductQuanity,
        cartTotalPrice,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
