import Image from 'next/image';
import Link from 'next/link';
import styles from './navfooter.module.scss'


export default function Navbar () {
  return (
    <div className={styles.navbar}>
      <div className={styles.container}>
        <Link href={`/`} className={styles.logoWrapper}>
          <Image
            src='https://vinyl.com/cdn/shop/t/59/assets/logo-vinyl.svg?v=17842724819086870561719374148'
            alt='Vinyl Logo'
            width={138}
            height={34}
            priority
            className={styles.logo}
          />
        </Link>
        <div className={styles.wrapper}>
          <div className={styles.pages}>
            pages
          </div>
          <div className={styles.input}>
            input
          </div>
          <div className={styles.account}>
            account
          </div>
          <div className={styles.cart}>
            cart
          </div>
        </div>
      </div>
    </div>
  )
}