import styles from './cart.module.scss';
import XIcon from './../../../public/x-icon.svg';
import Image from 'next/image';
import { Vinyl } from './VinylFilter';

interface CartProps {
  setToCart: React.Dispatch<React.SetStateAction<boolean>>;
  toCart: boolean;
}
export const shoppingCart: Vinyl[] = [];

export default function Cart ({
  setToCart,
  toCart
} : CartProps) {
  const shipping:number = shoppingCart.length>2 ? 5.99 : 4.99; // TO UPDATE
  let subTotal:number = 0;

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
                <div>CALC Shipping</div>
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