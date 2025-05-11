import styles from './navfooter.module.scss'
import Image from 'next/image'

const pages:string[] = [
  'About Us',
  'FAQ',
  'Support',
  'Terms Of Service',
  'Refund Policy',
  'Shipping Policy',
]



export default function Footer () {
  return (
    <div className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Image
            src='https://vinyl.com/cdn/shop/t/59/assets/logo-vinyl.svg?v=17842724819086870561719374148'
            alt='Vinyl Logo'
            width={138}
            height={34}
            priority
          />
        </div>
        <div className={styles.links}>
          <div className={styles.pages}>
            {
              pages.map((page, i) => (
                <span key={i} className={styles.page}>
                  {page}
                </span>
              ))
            }
          </div>
          <div className={styles.socials}>
            Socials
          </div>
        </div>
        <div className={styles.divider}/>
        <div className={styles.details}>
          <div className={styles.copyright}>
            <div className={styles.link}>
              <span>A</span>
              <Image
                src='https://vinyl.com/cdn/shop/t/59/assets/logo-vinyl.svg?v=17842724819086870561719374148'
                alt='Vinyl Logo'
                width={70}
                height={16}
                priority
              />
              <span>Group Company</span>
            </div>
            <div className={styles.rights}>
              © 2025 Vinyl, Inc. All Rights Reserved
            </div>
          </div>

          <div className={styles.powered}>
            <div className={styles.name}>
              <span>Powered by</span>
              <span>Aaron Yabut</span>
            </div>
            <div className={styles.region}>
              <span>Region:</span>
              <span className={styles.search}>
                <span className={styles.location}>United States</span>
                <span>▲</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}