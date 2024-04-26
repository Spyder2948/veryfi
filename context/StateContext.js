import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from 'react-hot-toast';


const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  const [searchResults, setSearchResults] = useState([]);

  let foundProduct;
  let index;

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  }

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find((item) => item._id === product._id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.amazon[3] * quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    if(checkProductInCart)
    {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if(cartProduct._id === product._id) return {
          ...cartProduct,
          quantity: cartProduct.quantity + quantity
        }
      })

      setCartItems(updatedCartItems);
    }
    else
    {
       product.quantity = quantity;

       setCartItems([...cartItems, {...product}]);
    }
    toast.success(`${qty} ${product.productName} added to the Wishlist`);
  }

  const decQty = () => {
    setQty((prevQty) => {
      if(prevQty - 1 < 1) return 1;
      return prevQty - 1;
    })
  }

  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id == product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.amazon * foundProduct.quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity);
    setCartItems(newCartItems);
  }

  return (
    <Context.Provider value={{ showCart, setShowCart, cartItems, totalPrice, totalQuantities, qty, incQty, decQty, onAdd, onRemove, searchResults, setSearchResults }}>
        {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context);