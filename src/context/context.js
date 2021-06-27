import React from "react";

const ItemContext = React.createContext(null);

export function useData() {
  return React.useContext(ItemContext);
}

export const ItemProvider = ({ children }) => {
  const [items, setItem] = React.useState();
  const [cartItem, setCartItem] = React.useState([]);
  const [savedItem, setSavedItem] = React.useState([]);
  const [totalAmount, setTotalAmount] = React.useState(0);

  const AmountFun = (val) => {
    setTotalAmount(totalAmount + val);
  };

  const addCartItem = (data) => {
    setTotalAmount(totalAmount + data.price);
    setCartItem([...cartItem, data]);
    let filterList = savedItem.filter((item) => item.id !== data.id);
    setSavedItem(filterList);
  };

  const removeCartItem = (data) => {
    setTotalAmount(totalAmount - data.price);
    let filterList = cartItem.filter((item) => item.id !== data.id);
    setCartItem(filterList);
  };

  const addSavedItem = (data) => {
    setTotalAmount(totalAmount - data.price);
    setSavedItem([...savedItem, data]);
    let filterList = cartItem.filter((item) => item.id !== data.id);
    setCartItem(filterList);
  };

  const removeSavedItem = (data) => {
    let filterList = savedItem.filter((item) => item.id !== data.id);
    setSavedItem(filterList);
  };

  const getItemData = async () => {
    await fetch("/MOCK_DATA.json")
      .then((res) => res.json())
      .then((data) => {
        setItem(data);
      });
  };

  React.useEffect(() => {
    getItemData();
  }, []);

  return (
    <ItemContext.Provider
      value={{
        items,
        cartItem,
        addCartItem,
        removeCartItem,
        savedItem,
        addSavedItem,
        removeSavedItem,
        totalAmount,
        AmountFun,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};
