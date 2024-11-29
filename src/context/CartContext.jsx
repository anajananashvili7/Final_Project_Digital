import React, { createContext, useState, useContext, useEffect } from 'react';

// Create context for the cart
const CartContext = createContext();

// Custom hook to use cart
export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  // Load cart from localStorage when the app first loads
  const loadCartFromLocalStorage = () => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  };

  const [cart, setCart] = useState(loadCartFromLocalStorage());

  // Sync cart with localStorage whenever it changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  // Add item to cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== id));
  };

  // Empty the cart
  const emptyCart = () => {
    setCart([]);
    localStorage.removeItem('cart'); // Optionally clear localStorage as well
  };

  // Update the quantity of an item in the cart
  const updateQuantity = (id, change) => {
    setCart((prevCart) => 
      prevCart.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(item.quantity + change, 1) } // Ensure quantity never goes below 1
          : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, emptyCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
