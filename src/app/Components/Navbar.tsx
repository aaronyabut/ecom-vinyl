'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './navfooter.module.scss';
import { useState, useEffect } from 'react';
import Magnifier from '../../../public/magnifier.svg';
import ArrowIcon from '../../../public/arrow-icon.svg';
// import Cart from './Cart';
import { useShoppingCart } from '../ClientLayout';


const navLinks:string[] = [
  "Collections",
  "Vinyl",
  "Gift Cards",
  "Win",
  "CDs",
]

export default function Navbar () {
  const [selecting, setSelecting] = useState<string>("")
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  // const [toCart, setToCart] = useState<boolean>(false);
  const [cartCount, setCartCount] = useState<number>(0);
  const {shoppingCart, openCart, setOpenCart} = useShoppingCart();

  const handleSearch = (e:React.ChangeEvent<HTMLInputElement>) => {
    setSelecting(e.target.value);
  }
  const handleToggle = () => {
    setOpenCart(!openCart)
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past 80px
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  useEffect(() => {
    const updateCartCount = () => {
      const sumQuantity = shoppingCart.reduce((sum, vinyl) => Number(sum) + Number(vinyl.quantity || 0), 0);
      // console.log("CHECKING", sumQuantity);
      // console.log("sumQuantity", sumQuantity);
      setCartCount(sumQuantity);
    };
    updateCartCount();
  }, [shoppingCart.map(item => item.quantity).join(",")]);

  return (
    <div className={`${styles.navbar} ${isVisible ? styles.visible : styles.hidden}`}>
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
            {
              navLinks.map((page, i) => (
                <div key={i} className={styles.pageWrapper}>
                  <div className={styles.page}>
                    {page.toUpperCase()}
                  </div>
                  {page === "Vinyl" &&
                    <span>
                      <Image
                        src={ArrowIcon}
                        width={16}
                        height={16}
                        alt="Arrow icon"
                        className={styles.icon}
                        />
                    </span>
                  }
                {page === "Win" &&
                  <div className={styles.pulse}></div>
                }
                </div>
              ))
            }
          </div>
          <div className={styles.input}>
            <div className={styles.inputWrapper}>
              <input
                type='text'
                placeholder='Search by artist, album, UPC'
                value={selecting}
                onChange={handleSearch}
              />
              <button className={styles.searchButton}>
                <Image
                  src={Magnifier}
                  width={20}
                  height={20}
                  alt="Magnifier"
                />
              </button>
            </div>
          </div>
          <div className={styles.account}>
            <Image
              src="https://vinyl.com/cdn/shop/t/59/assets/account-28.svg"
              width={28}
              height={28}
              alt="Account icon"
              className={styles.icon}
            />
            <span>
              Account
            </span>
          </div>
          <div className={styles.cart} onClick={()=> handleToggle()}>
            <Image
              src="https://vinyl.com/cdn/shop/t/59/assets/bag-icon-28.svg"
              width={28}
              height={28}
              alt="Account icon"
            />
            <span className={`${styles.cartCount}
              ${cartCount < 10 && styles.single}
              ${cartCount >= 10 && styles.double}
              ${cartCount >= 100 && styles.triple}
              `}
            >
              {cartCount > 0 && `${cartCount}`}
              {/* {cartCount} */}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}