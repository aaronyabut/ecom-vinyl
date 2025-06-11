'use client';

import { createContext, useContext, useState } from 'react';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import { Vinyl } from './page'; // Adjust path as needed
import Cart from './Components/Cart';
import styles from './page.module.scss'
import NotifyMe from './Components/NotifyMe';

// Define the context type
interface CartContextType {
  shoppingCart: Vinyl[];
  setShoppingCart: React.Dispatch<React.SetStateAction<Vinyl[]>>;
  openCart: boolean;
  setOpenCart: React.Dispatch<React.SetStateAction<boolean>>;
  toNotify: boolean;
  setToNotify: React.Dispatch<React.SetStateAction<boolean>>;
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
  const [openCart, setOpenCart] = useState<boolean>(false);
  const [toNotify, setToNotify] = useState<boolean>(false);

  return (
    <div className={`${openCart && styles.noScroll}`}>
      <CartContext.Provider value={{ shoppingCart, setShoppingCart, openCart, setOpenCart, toNotify, setToNotify }}>
        <Navbar />
        {children}
        <Footer />
        <Cart />
        <NotifyMe />
      </CartContext.Provider>
    </div>
  );
}