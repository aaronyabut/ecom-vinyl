import styles from './cart.module.scss';

interface CartProps {
  setToCart: React.Dispatch<React.SetStateAction<boolean>>;
  toCart: boolean;
}

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
    Cart
  </div>
</div>
  )
}