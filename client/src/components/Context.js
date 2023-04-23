import { createContext, useState, useEffect } from "react";

export const Context = createContext();

const Provider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [specItem, setSpecItem] = useState(null);

  // All items
  useEffect(() => {
    setIsLoading(true);
    fetch("/items")
      .then((res) => res.json())
      .then((data) => {
        setItems(data.data);
        setIsLoading(false);
      });
  }, []);

  //Retrieve entire cart
  useEffect(() => {
    fetch("/cart")
      .then((res) => res.json())
      .then((data) => {
        setCart(data.data);
      });
  }, []);

  return (
    <Context.Provider
      value={{
        items,
        setItems,
        specItem,
        setSpecItem,
        cart,
        setCart,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
