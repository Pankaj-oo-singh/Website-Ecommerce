// import { createContext, useContext, useState } from 'react';

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);

//   // const addToCart = (product) => {
//   //   const existingItem = cartItems.find(item =>
//   //     item.id === product.id &&
//   //     item.color === product.color &&
//   //     item.size === product.size
//   //   );

//   //   if (existingItem) {
//   //     setCartItems(cartItems.map(item =>
//   //       item.id === product.id &&
//   //       item.color === product.color &&
//   //       item.size === product.size
//   //         ? { ...item, quantity: item.quantity + product.quantity }
//   //         : item
//   //     ));
//   //   } else {
//   //     setCartItems([...cartItems, product]);
//   //   }
//   // };
//   const addToCart = ({ product, variant, quantity, color, size }) => {
//     const newItem = {
//       id: `${product.id}-${variant.id}-${color}-${size}`, // Unique identifier
//       productId: product.id,
//       productVariantId: variant.id,
//       name: product.name,
//       color,
//       size,
//       quantity,
//       price: variant.price,
//       discount: variant.discount || 0,
//     };
  
//     const existingItem = cartItems.find(item =>
//       item.productId === newItem.productId &&
//       item.productVariantId === newItem.productVariantId &&
//       item.color === newItem.color &&
//       item.size === newItem.size
//     );
  
//     if (existingItem) {
//       setCartItems(cartItems.map(item =>
//         item.productId === newItem.productId &&
//         item.productVariantId === newItem.productVariantId &&
//         item.color === newItem.color &&
//         item.size === newItem.size
//           ? { ...item, quantity: item.quantity + newItem.quantity }
//           : item
//       ));
//     } else {
//       setCartItems([...cartItems, newItem]);
//     }
//   };
  
//   const updateQuantity = (index, newQuantity) => {
//     setCartItems(cartItems.map((item, i) =>
//       i === index ? { ...item, quantity: newQuantity } : item
//     ));
//   };

//   const removeItem = (index) => {
//     setCartItems(cartItems.filter((_, i) => i !== index));
//   };

//   const clearCart = () => {
//     setCartItems([]);
//   };

//   return (
//     <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeItem, clearCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);



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
