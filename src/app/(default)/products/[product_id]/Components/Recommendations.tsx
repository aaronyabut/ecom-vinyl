'use client';

import { useRef } from 'react';
import styles from '../page.module.scss';
import { Vinyl } from '@/app/(default)/page';
import Image from 'next/image';
import Link from 'next/link';
import WishlistIcon from '@public/wishlist-heart.svg';
import ArrowIcon from '@public/arrow-icon.svg';
// import { useCart } from '@/app/ClientLayout';
import { useShoppingCart } from '@/app/ShoppingCart';

const recommendationsHeader = "YOU'LL DIG THESE...";

interface RecommendationsProps {
  recommendedVinyls: Vinyl[] | null;
}

export default function Recommendations({ recommendedVinyls }: RecommendationsProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false); // Prevent recursive scroll events
  // const { setShoppingCart } = useCart();
  const { setShoppingCart } = useShoppingCart();

  const addingToCart = (vinyl:Vinyl) => {
    setShoppingCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.product_id === vinyl.product_id);
      if (existingItem) {
        // Update quantity immutably
        return prevCart.map((cartItem) =>
          cartItem.product_id === vinyl.product_id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      // Add new item with quantity 1
      return [...prevCart, { ...vinyl, quantity: 1 }];
    });
  }

  // Handle arrow button clicks and scroll
  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current && !isScrolling.current) {
      const scrollAmount = 292; // Scroll by one vinyl card
      carouselRef.current.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className={styles.recommendations}>
      <div className={styles.container}>
        <div className={styles.headerWrapper}>
          <h2 className={styles.header}>{recommendationsHeader}</h2>
          <div className={styles.arrows}>
            <button onClick={() => scroll('left')} className={styles.arrowButton}>
              <Image
                src={ArrowIcon}
                height={20}
                width={20}
                alt='arrow icon'
                className={`${styles.leftArrowButton}`}
              />
            </button>
            <button onClick={() => scroll('right')} className={styles.arrowButton}>
              <Image
                src={ArrowIcon}
                height={20}
                width={20}
                alt='arrow icon'
                className={`${styles.rightArrowButton}`}
              />
            </button>
          </div>
        </div>
        <div className={styles.carouselWrapper}>
          <div className={styles.vinyls} ref={carouselRef}>
            {recommendedVinyls?.map((vinyl) => (
              <div key={vinyl.product_id} className={styles.vinyl}>
              <div className={styles.imageWrapper}>
                <div className={styles.wishlist}>
                  <Image
                    src={WishlistIcon}
                    alt="wishlist"
                    width={25}
                    height={25}
                    className={styles.iconImage}
                  />
                </div>
                <Link
                  href={`/products/${vinyl.product_id}`}
                  className={styles.productLink}
                >
                  <Image
                    src={vinyl.vinyl_img}
                    width={267}
                    height={267}
                    alt={`${vinyl.vinyl_title} by ${vinyl.vinyl_artist}`}
                    className={styles.image}
                  />
                  <div className={styles.btnContainer} />
                </Link>
                {vinyl.no_stock_label ? (
                  <div className={styles.toCart}>NOTIFY ME</div>
                ) : (
                  <div
                    className={styles.toCart}
                    onClick={()=>addingToCart(vinyl)}
                  >
                    ADD TO CART
                  </div>
                )}
                {vinyl.sale_label && (
                  <span className={styles.sale}>{vinyl.sale_label}</span>
                )}
                {vinyl.low_stock_label && (
                  <span className={styles.lowStock}>
                    <span className={styles.lowStockLabel}>• </span>
                    {vinyl.low_stock_label}
                  </span>
                )}
                {vinyl.no_stock_label && (
                  <span className={styles.noStock}>
                    <span className={styles.noStockLabel}>• </span>
                    SOLD OUT
                  </span>
                )}
              </div>
              <Link href={`/products/${vinyl.product_id}`}>
                <p className={styles.title}>
                  <span>
                    <strong>{vinyl.vinyl_title}</strong>
                  </span>
                </p>
                <p>{vinyl.vinyl_artist}</p>
              </Link>
              <div className={styles.priceContainer}>
                <div>
                  {vinyl.old_price && (
                    <span className={styles.oldPrice}>
                      <s>${vinyl.old_price}</s>
                    </span>
                  )}
                  <span className={styles.price}> ${vinyl.price}</span>
                </div>
                <span className={styles.vinylLabel}>VINYL</span>
              </div>
            </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}