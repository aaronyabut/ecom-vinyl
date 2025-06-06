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
    height: 16,
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
    height: 24,
    width: 70,
  },
  {
    title: 'YouTube',
    icon: YouTube,
    height: 31,
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
          <div className={styles.powered}>
            <div className={styles.name}>
              <span>Cloned by</span>
              <span>
                <a href='https://www.aaronyabut.com' target="_blank">
                  Aaron Yabut
                </a>
              </span>
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
/*
"[
  [
    'https://cdn.shopify.com/s/files/1/0704/2026/7313/files/person-fallback-2.png?v=1696843194',
    'Chris Caswell',
    'Composer, Lyricist'
  ],
  [
    'https://cdn.shopify.com/s/files/1/0704/2026/7313/files/person-fallback-2.png?v=1696843194',
    'Daryl Braithwaite',
    'Composer, Composer'
  ],
  [
    'https://cdn.shopify.com/s/files/1/0704/2026/7313/files/person-fallback-2.png?v=1696843194',
    'Garth Porter',
    'Composer, Composer'
  ],
  [
    'https://i.scdn.co/image/ae53e43ad044fe30298ac986a606bef7db4617bb?d=200x200',
    'Giorgio Moroder',
    'Composer'
  ],
  [
    'https://cdn.shopify.com/s/files/1/0704/2026/7313/files/person-fallback-2.png?v=1696843194',
    'Guy-Manuel de Homem-Christo',
    'Composer, Lyricist'
  ],
  [
    'https://cdn.shopify.com/s/files/1/0704/2026/7313/files/person-fallback-2.png?v=1696843194',
    'Jason ""Chilly Gonzales"" Beck',
    'Composer, Lyricist'
  ],
  [
    'https://i.scdn.co/image/e7a1396741154b787911a8c6c9ba21a6f5b55a5f?d=200x200',
    'Julian Casablancas',
    'Composer, Lyricist'
  ],
  [
    'https://artwork.jaxsta.com/995/c8d11488-34f0-458a-8291-33a62e25bc4d.png?d=200x200',
    'Nile Rodgers',
    'Composer, Lyricist'
  ],
  [
    'https://cdn.shopify.com/s/files/1/0704/2026/7313/files/person-fallback-2.png?v=1696843194',
    'Noah Lennox',
    'Composer, Lyricist'
  ],
  [
    'https://i.scdn.co/image/ab6761610000e5eb04e5fdddac06cf2a89250166?d=200x200',
    'Paul Jackson Jr.',
    'Composer, Lyricist'
  ],
  [
    'https://i.scdn.co/image/ab67616d0000b2734e75df6a8779091adfc66208?d=200x200',
    'Paul Williams',
    'Composer, Lyricist'
  ],
  [
    'https://i.scdn.co/image/ab6761610000e5ebf0789cd783c20985ec3deb4e?d=200x200',
    'Pharrell Williams',
    'Composer, Lyricist'
  ],
  [
    'https://cdn.shopify.com/s/files/1/0704/2026/7313/files/person-fallback-2.png?v=1696843194',
    'Stephane Queme',
    'Composer'
  ],
  [
    'https://i.scdn.co/image/ab6761610000e5eb21d3d979f54b6f9348df55bd?d=200x200',
    'Thomas Bangalter',
    'Composer, Lyricist'
  ],
  [
    'https://cdn.shopify.com/s/files/1/0704/2026/7313/files/person-fallback-2.png?v=1696843194',
    'Todd Imperatrice',
    'Composer, Lyricist'
  ],
  [
    'https://cdn.shopify.com/s/files/1/0704/2026/7313/files/person-fallback-2.png?v=1696843194',
    'Tony Mitchell',
    'Composer'
  ]
]"
*/