import styles from './navfooter.module.scss'
import Image from 'next/image'
import XLogo from '../../../public/socials/x-logo.svg'
import Facebook from '../../../public/socials/facebook-logo.svg'
import Tiktok from '../../../public/socials/tiktok-logo.svg'
import YouTube from '../../../public/socials/youtube-logo.svg'
import Instagram from '../../../public/socials/instagram-logo.svg'

const pages:string[] = [
  'About Us',
  'FAQ',
  'Support',
  'Terms Of Service',
  'Refund Policy',
  'Shipping Policy',
]

interface socialsType {
  title: string;
  icon: string;
  height: number;
  width: number;
}

const socials:socialsType[] = [
  {
    title: 'X',
    icon: XLogo,
    height: 18,
    width: 70,
  },
  {
    title: 'Instagram',
    icon: Instagram,
    height: 26,
    width: 70,
  },
  {
    title: 'Facebook',
    icon: Facebook,
    height: 23,
    width: 70,
  },
  {
    title: 'Tiktok',
    icon: Tiktok,
    height: 25,
    width: 70,
  },
  {
    title: 'YouTube',
    icon: YouTube,
    height: 30,
    width: 70,
  },
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
            {
              socials.map((social, i) => (
                <Image
                  src={social.icon}
                  alt='Social Logo'
                  width={social.width}
                  height={social.height}
                  key={i}
                  className={styles.social}
                  priority
                />
              ))
            }
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
          {/* <Image
            src={XLogo}
            alt='Vinyl Logo'
            width={70}
            height={16}
            priority
          /> */}

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