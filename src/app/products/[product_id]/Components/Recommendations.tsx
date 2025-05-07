'use client';

import { useRef } from 'react';
import styles from '../page.module.scss';
import { Vinyl } from '../page';

const recommendationsHeader = "YOU'LL DIG THESE...";

interface RecommendationsProps {
  recommendedVinyls: Vinyl[] | null;
}

export default function Recommendations({ recommendedVinyls }: RecommendationsProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false); // Prevent recursive scroll events

  // Handle arrow button clicks and scroll
  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current && !isScrolling.current) {
      const scrollAmount = carouselRef.current.offsetWidth; // Scroll by one viewport width
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
              ←
            </button>
            <button onClick={() => scroll('right')} className={styles.arrowButton}>
              →
            </button>
          </div>
        </div>
        <div className={styles.carouselWrapper}>
          <div className={styles.vinyls} ref={carouselRef}>
            {recommendedVinyls?.map((vinyl, i) => (
              <div key={`vinyl-${i}`} className={styles.vinyl}>
                {vinyl.vinyl_title}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}