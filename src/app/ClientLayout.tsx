'use client';

import { createContext, useContext, useState } from 'react';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import { Vinyl } from './page'; // Adjust path as needed

// Define the context type
interface CartContextType {
  shoppingCart: Vinyl[];
  setShoppingCart: React.Dispatch<React.SetStateAction<Vinyl[]>>;
}

// Create the context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Custom hook to use the CartContext
export const useShoppingCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [shoppingCart, setShoppingCart] = useState<Vinyl[]>([]);

  return (
    <CartContext.Provider value={{ shoppingCart, setShoppingCart }}>
      <Navbar />
      {children}
      <Footer />
    </CartContext.Provider>
  );
}