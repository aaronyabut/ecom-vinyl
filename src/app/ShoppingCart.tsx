'use client';

import { createContext, useContext, useState } from 'react';
import { Vinyl } from './(default)/page';

interface ShopppingCartContextType {
  shoppingCart: Vinyl[];
  setShoppingCart: React.Dispatch<React.SetStateAction<Vinyl[]>>;
}

const ShopppingCartContext = createContext<ShopppingCartContextType | undefined>(undefined);

export const useShoppingCart = () => {
  const context = useContext(ShopppingCartContext);
  if (!context) {
    throw new Error(`useShoppingCart must be used within a ShoppingCartProvider ${context}`);
  }
  console.log('context', context)
  return context;
};

export function ShoppingCart({
  children,
}: {
  children: React.ReactNode
}) {
  const [shoppingCart, setShoppingCart] = useState<Vinyl[]>([]);

  return (
    <div>
      <ShopppingCartContext.Provider value={{shoppingCart, setShoppingCart}}>
        {children}
      </ShopppingCartContext.Provider>
    </div>
  )
}