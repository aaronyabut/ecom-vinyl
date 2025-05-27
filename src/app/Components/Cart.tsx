'use client';
import styles from './cart.module.scss';
import XIcon from './../../../public/x-icon.svg';
import Image from 'next/image';
import { Vinyl } from './VinylFilter';
import { useEffect, useState } from 'react';

interface CartProps {
  setToCart: React.Dispatch<React.SetStateAction<boolean>>;
  toCart: boolean;
}
export const shoppingCart: Vinyl[] = [];

export default function Cart ({
  setToCart,
  toCart
} : CartProps) {
  const [shipping, setShipping] = useState<number>(4.99)
  let subTotal:number = 0;

  useEffect(()=> {
    async function shoppingCartUpdates () {
      try {
        if (shoppingCart.length>1) {
          setShipping(5.99);
        } else {
          setShipping(4.99);
        }
      } catch (error) {
        console.error('Error within shopping cart:', error);
      }
    }
    shoppingCartUpdates()
  }, [shoppingCart.length])

  return (
    <div className={`${styles.cartContainer} ${toCart ? styles.showCart : styles.hideCart}`}>
      <div
        className={`${styles.bg} ${toCart ? styles.visible : ''}`}
        onClick={() => setToCart(false)}
      >
      </div>
      <div className={`${styles.cart} ${toCart ? styles.visible : ''}`}>
        <div className={styles.topWrapper}>
          <div className={styles.headerWrapper}>
            <div className={styles.header}>
              <div className={styles.title}>MY CART</div>
              <div className={styles.icon}>
                <Image
                  src={XIcon}
                  height={20}
                  width={20}
                  alt="x icon"
                  onClick={() => setToCart(false)}
                />
              </div>
            </div>
            <div className={styles.totalProducts}>
              {shoppingCart.length === 1 ? `${shoppingCart.length} Product` :
              `${shoppingCart.length} Products`
              }
            </div>
            {
              shoppingCart.length ?
              <div className={styles.shippingWrapper}>
                <div>PROGRESS BAR</div>
                {
                  subTotal < 60 ?
                  <div>Just $s more for FREE shipping. </div>
                  :
                  <div>CALC Shipping</div>
                }
              </div>
              :
              null
            }
            <div className={styles.divider}></div>
          </div>
          <div className={styles.vinylsWrapper}>
            {
              shoppingCart.map((vinyl,i) => {
                subTotal += Number(vinyl.price);
                return (
                  <div key={i}>
                    {vinyl.vinyl_title}
                  </div>
                )
              })
            }
          </div>
        </div>
        <div className={styles.modalFooter}>
          <div className={styles.totalWrapper}>
            <div className={styles.subTotal}>
              <span>Sub Total</span>
              <span>$
                {
                  !subTotal ?
                  <span>0.00</span>
                  :
                  <span>{subTotal}</span>
                }
              </span>
            </div>
            {
              !!shoppingCart.length &&
              <div className={styles.subTotal}>
                <span>Estimate shipping costs</span>
                {
                  subTotal >= 60 ?
                  <span>FREE</span>
                  :
                  <span>${shipping}</span>
                }
              </div>
            }
            <div className={styles.orderTotal}>
              <span>Order Total</span>
              <span>$
                {
                  subTotal > 0 ?
                  <span>
                    {
                      subTotal > 60 ?
                      <span>
                        {subTotal}
                      </span>
                      :
                      <span>
                        {subTotal + shipping}
                      </span>
                    }
                  </span>
                  :
                  <span>0.00</span>
                }
              </span>
            </div>
          </div>
          {
            !!shoppingCart.length &&
            <div className={styles.shippingProtection}>
              <Image
                src='https://monsterocu-prod-publicfiles.s3.eu-central-1.amazonaws.com/monster-protect-1.png'
                height={30}
                width={30}
                alt='shipping icon'
              />
              <div className={styles.details}>
                <div className={styles.header}>Shipping Protection $4.99</div>
                <div className={styles.info}>Select to protect your order from damage, loss or theft during transit.</div>
              </div>
              <div>Toggle</div>
            </div>
          }
          <div className={`${styles.checkout} ${shoppingCart.length && styles.active}`}>Proceed to Checkout</div>
          {
            shoppingCart.length ?
            <div className={styles.shippingAndTaxes}>Taxes calculated at checkout</div>
            :
            <div className={styles.shippingAndTaxes}>Shipping & taxes calculated at checkout</div>
          }
        </div>
      </div>
    </div>
  )
}