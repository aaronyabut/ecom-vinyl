import styles from './items.module.scss'

export default function Items () {
  return (
    <div className={styles.itemsContainer}>
      <div className={styles.innerContainer}>
        <div className={styles.itemList}>
          Item list
        </div>
        <div className={styles.discountCode}>
          Discount code
        </div>
        <div className={styles.cartTotal}>
          <div className={styles.subtotalContainer}>
            <div className={styles.subtotal}>Subtotal</div>
            <div className={styles.price}>SUB TOTAL NUM</div>
          </div>
          <div className={styles.shippingContainer}>
            <div className={styles.labelContainer}>
              <div className={styles.label}>Shipping</div>
              <div className={styles.icon}>Icon/modal</div>
            </div>
            {/* <div className={styles.shippingCost}>Shipping Cost</div> */}
            <div className={styles.blankAddress}>Enter shipping address</div>
          </div>
          <div className={styles.totalContainer}>
            <div className={styles.label}>Total</div>
            <div className={styles.priceContainer}>
              <div className={styles.usdLabel}>USD</div>
              <div className={styles.totalNumber}>TOTAL NUM</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}