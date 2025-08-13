import styles from './styles/notify.module.scss';
import XIcon from '@public/x-icon.svg'
import Image from 'next/image';
import { useCart } from './ClientLayout';



export default function NotifyMe () {
  const { toNotify, setToNotify } = useCart();
  return (
    <div className={`${styles.notifyMeContainer} ${toNotify ? styles.showModal : styles.hideModal} ${toNotify && styles.noScroll}`}>
      <div
        className={`${styles.bg} ${toNotify ? styles.visible : ''}`}
        onClick={()=>setToNotify(false)}
      >
      </div>
      <div  className={`${styles.modal} ${toNotify ? styles.visible : ''}`}>
        <div className={styles.title}>
          <div className={styles.close} onClick={()=>setToNotify(false)}>
            <Image
              src={XIcon}
              height={10}
              width={10}
              alt="close icon"
              className={styles.icon}
            />
          </div>
          <div className={styles.mainTitle}>GET NOTIFIED</div>
          <div className={styles.secondaryTitle}>{"WHEN IT'S BACK IN STOCK"}</div>
          <div className={styles.overlay} />
        </div>
        <div className={styles.description}>{"Drop your email below and we'll let you know you when this record is back in stock. You may also receive new vinyl releases and exclusive discounts."}</div>
        <form className={styles.form}>
          <input className={styles.name} placeholder="First name"/>
          <input className={styles.email} placeholder="Email address" />
          <div className={styles.notifyButton} onClick={()=>console.log(toNotify)}>NOTIFY ME</div>
        </form>
      </div>
    </div>
  )
}