



import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (cartItem) => {
    const existingItem = cartItems.find(
      (item) =>
        item.productId === cartItem.productId &&
        item.productVariantId === cartItem.productVariantId &&
        item.color === cartItem.color &&
        item.size === cartItem.size
    );

    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.productId === cartItem.productId &&
          item.productVariantId === cartItem.productVariantId &&
          item.color === cartItem.color &&
          item.size === cartItem.size
            ? { ...item, quantity: item.quantity + cartItem.quantity }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, cartItem]);
    }
  };

  const updateQuantity = (index, newQuantity) => {
    setCartItems(cartItems.map((item, i) =>
      i === index ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (index) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
