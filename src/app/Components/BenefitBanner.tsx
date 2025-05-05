import styles from '../page.module.scss';
import Image from 'next/image';

const benefitsData = [
  {
    label: 'Free Shipping',
    icon: 'https://vinyl.com/cdn/shop/t/59/assets/trunk.svg'
  },
  {
    label: 'Buy Now Pay Later',
    icon: 'https://vinyl.com/cdn/shop/t/59/assets/hand-coins.svg'
  },
  {
    label: '50k+ Titles',
    icon: 'https://vinyl.com/cdn/shop/t/59/assets/vinyl-record.svg'
  },
  {
    label: 'Happy Customers',
    icon: 'https://vinyl.com/cdn/shop/t/59/assets/tenplus.svg'
  },
]

export default function BenefitsBanner () {
  return (
    <div className={styles.banner}>
      <div className={styles.bannerWrapper}>
        {benefitsData.map((item,i)=> (
          <div key={i} className={styles.itemWrapper}>
            <Image
              src={item.icon}
              height={50}
              width={50}
              alt={`${item.label} icon`}
            />
            {item.label}
          </div>
        ))}
      </div>
    </div>
    // <div className={styles.banner}>
    //   <div className={styles.bannerWrapper}>
    //     <div className={styles.itemWrapper}>
    //       <Image
    //         src="https://vinyl.com/cdn/shop/t/59/assets/trunk.svg"
    //         height={50}
    //         width={50}
    //         alt='shipping truck'
    //       />
    //       Free Shipping
    //     </div>
    //     <div className={styles.itemWrapper}>
    //       <Image
    //         src="https://vinyl.com/cdn/shop/t/59/assets/hand-coins.svg"
    //         height={50}
    //         width={50}
    //         alt='hand coin'
    //       />
    //       Buy Now Pay Later
    //     </div>
    //     <div className={styles.itemWrapper}>
    //       <Image
    //         src="https://vinyl.com/cdn/shop/t/59/assets/vinyl-record.svg"
    //         height={50}
    //         width={50}
    //         alt='vinyl record'
    //       />
    //       50k+ Titles
    //     </div>
    //     <div className={styles.itemWrapper}>
    //       <Image
    //         src="https://vinyl.com/cdn/shop/t/59/assets/tenplus.svg"
    //         height={50}
    //         width={50}
    //         alt='ten plus'
    //       />
    //       Happy Customers
    //     </div>
    //   </div>
    // </div>
  )
}