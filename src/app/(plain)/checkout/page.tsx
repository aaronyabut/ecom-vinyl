import Image from 'next/image';
import styles from './page.module.scss'

export default function Checkout () {
  return (
    <div className={styles.checkoutContainer}>
      <div className={styles.headerContainer}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <Image
              src="https://cdn.shopify.com/s/files/1/0704/2026/7313/files/Vinyl_1_x320.png?v=1692630836"
              height={40}
              width={168}
              alt="Vinyl logo"
            />
          </div>
          <div className={styles.icon}>
            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" focusable="false" aria-hidden="true">
              <path d="m2.007 10.156.387-4.983a1 1 0 0 1 .997-.923h7.218a1 1 0 0 1 .997.923l.387 4.983c.11 1.403-1.16 2.594-2.764 2.594H4.771c-1.605 0-2.873-1.19-2.764-2.594"></path>
              <path d="M5 3.5c0-1.243.895-2.25 2-2.25S9 2.257 9 3.5V5c0 1.243-.895 2.25-2 2.25S5 6.243 5 5z"></path>
            </svg> */}
          </div>
        </div>
      </div>
      <div className={styles.bodyContainer}>
        <div className={styles.body}>
          <div className={styles.formContainer}>formContainer</div>
          <div className={styles.items}>items</div>
        </div>
      </div>
    </div>
  )
}