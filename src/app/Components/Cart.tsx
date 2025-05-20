import styles from './cart.module.scss';

interface CartProps {
  setToCart: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Cart ({
  setToCart
} : CartProps) {
  return (
    <div className={styles.cartContainer} onClick={() => setToCart(false)}>

    </div>
  )
}