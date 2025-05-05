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
  )
}