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
            <div className={styles.shippingWrapper}>
              <div>PROGRESS BAR</div>
              <div>CALC Shipping</div>
            </div>
            {/* <div className={styles.}></div> */}
          </div>
          <div className={styles.vinylsWrapper}>
            BODY
          </div>
        </div>
        <div className={styles.totalWrapper}>
          FOOTER
        </div>
      </div>
    </div>
  )
}