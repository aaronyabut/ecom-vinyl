'use client';

import { createContext, useContext, useState } from 'react';
import { Vinyl } from './(default)/page';

interface ShopppingCartContextType {
  shoppingCart: Vinyl[];
  setShoppingCart: React.Dispatch<React.SetStateAction<Vinyl[]>>;
  subTotal: number;
  setSubTotal: React.Dispatch<React.SetStateAction<number>>;
  shippingProtection: boolean;
  setShippingProtection: React.Dispatch<React.SetStateAction<boolean>>;
  shipping: number;
  setShipping: React.Dispatch<React.SetStateAction<number>>;
  cartCount: number;
  setCartCount: React.Dispatch<React.SetStateAction<number>>;
  freeShipping: number;
  setFreeShipping: React.Dispatch<React.SetStateAction<number>>;
  shippingProtectionCost: number;
  setShippingProtectionCost: React.Dispatch<React.SetStateAction<number>>;
}

const ShopppingCartContext = createContext<ShopppingCartContextType | undefined>(undefined);

export const useShoppingCart = () => {
  const context = useContext(ShopppingCartContext);
  if (!context) {
    throw new Error(`useShoppingCart must be used within a ShoppingCartProvider ${context}`);
  }
  // console.log('context', context)
  return context;
};

export function ShoppingCart({
  children,
}: {
  children: React.ReactNode
}) {
  const [shoppingCart, setShoppingCart] = useState<Vinyl[]>([]);
  const [subTotal, setSubTotal] = useState<number>(0);
  const [shippingProtection, setShippingProtection] = useState<boolean>(false);
  const [shipping, setShipping] = useState<number>(4.99);
  const [cartCount, setCartCount] = useState<number>(0);
  const [freeShipping, setFreeShipping] = useState<number>(60);
  const [shippingProtectionCost, setShippingProtectionCost] = useState<number>(4.99);

  return (
    <div>
      <ShopppingCartContext.Provider
        value={{
          shoppingCart, setShoppingCart,
          subTotal, setSubTotal,
          shippingProtection, setShippingProtection,
          shippingProtectionCost, setShippingProtectionCost,
          shipping, setShipping,
          cartCount, setCartCount,
          freeShipping, setFreeShipping,
        }}>
        {children}
      </ShopppingCartContext.Provider>
    </div>
  )
}