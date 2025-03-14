'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './page.module.scss';
import Image from 'next/image';
import WishlistIcon from '../../public/wishlist-heart.svg';
import UpIcon from '../../public/up-icon.svg'

interface Vinyl {
  product_id: number;
  vinyl_img: string
  product_href: string;
  vinyl_title: string;
  vinyl_artist: string;
  price: number;
  old_price: number | null;
  sale_label: string | null;
  low_stock_label: string | null;
  genre: string;
  vinyl_description: string;
}

const genres: string[] = ['Blues', 'Rock', 'Country', 'Jazz', 'RnB / Soul', 'Pop']

export default function VinylFilter({ initialVinyls }: { initialVinyls: Vinyl[] }) {
  const [vinyls, setVinyls] = useState(initialVinyls);
  const [genre, setGenre] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false); // State to toggle dropdown

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev); // Toggle open/closed on click
  };

  const handleCheckboxChange = (e:any) => {
    const value:any = e.target.value;
    const checked:any = e.target.checked;

    console.log(checked)

    if (checked) {
      setGenre([...genre, value])
    } else {
      setGenre(genre.filter(item => item !== value))
    }
  }

  const handleFilterReset = (e:any) => {

  }

  useEffect(() => {
    async function fetchFilteredVinyls() {
      try {
        const url = genre.length
          ? `http://localhost:4000/vinyls?${genre.map(g => `genre=${g}`).join('&')}`
          : 'http://localhost:4000/vinyls';
        const response = await axios.get(url);
        setVinyls(response.data);
      } catch (error) {
        console.error('Error fetching filtered vinyls:', error);
        setVinyls([]);
      }
    }
    fetchFilteredVinyls();
  }, [genre]); // Refetch when genre changes

  return (
    <div className={styles.mainLayout}>
      <div className={styles.filter}>
        <div className={styles.filterHeaders}>
          <span>Filter by</span>
          <span className={styles.resetAll}><button>Reset all</button></span>
        </div>
        <div
          className={`${styles.legendWrapper} ${isOpen ? styles.active : ''}`}
          onClick={toggleDropdown}
        >
          <legend>Genre</legend>
          <Image
            src={UpIcon}
            width={15}
            height={15}
            alt="arrow icon"
            className={isOpen ? styles.rotateIcon : styles.rotateIcon2}
          />
        </div>
        <div className={`${styles.genreList} ${isOpen ? styles.open : ''}`}>
          {genres.map((currentGenre: string, i: number) => {
            let genreVal: string = currentGenre.toLowerCase();
            return (
              <div className={styles.checkboxWrapper} key={i}>
                <input
                  type="checkbox"
                  name={genreVal}
                  id={genreVal}
                  value={genreVal}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor={genreVal}>{currentGenre}</label>
              </div>
            );
          })}
        </div>
        <div className={styles.stock}>Show only in stock</div>
      </div>
      {/* <button onClick={()=>setGenre([])}>
        RESET FILTER
      </button> */}
      {/* <button onClick={()=>console.log(`Current genre array: ${genre}`)}>
        CLICK TO CHECK
      </button> */}
      <div className={styles.products}>
        {vinyls.length === 0 ? (
          <p>No vinyls available.</p>
        ) : (
          <div className={styles.vinylContainer}>
            {vinyls.map((vinyl) => (
              <div key={vinyl.product_id} className={styles.vinyl}>
                <div className={styles.imageWrapper}>
                  <div className={styles.wishlist}>
                    <Image
                      src={WishlistIcon}
                      alt='test'
                      width={25}
                      height={25}
                      className={styles.iconImage}
                    />
                  </div>
                  <Image
                    src={vinyl.vinyl_img}
                    width={267}
                    height={267}
                    alt='Test'
                    className={styles.image}
                  />
                  <div className={styles.toCart}>
                    ADD TO CART
                  </div>
                </div>
                {/* THIS IS FOR ME TO INDICATE FILTER WORKING */}
                {/* <p><strong>{vinyl.genre.toUpperCase()}</strong></p> */}
                <p className={styles.title} ><span><strong>{vinyl.vinyl_title}</strong></span></p>
                <p>{vinyl.vinyl_artist}</p>
                <div className={styles.priceContainer}>
                  <div>
                    {vinyl.old_price &&
                      <span className={styles.oldPrice}><s>${vinyl.old_price}</s></span>
                    }
                    <span className={styles.price}>{" "}${vinyl.price}</span>
                  </div>
                  <span className={styles.vinylLabel}>VINYL</span>
                </div>
                {
                  vinyl.sale_label &&
                  <span className={styles.sale}>
                    <span className={styles.saleLabel}>&#x2022; </span>
                    {vinyl.sale_label}
                  </span>
                }
                {
                  vinyl.low_stock_label &&
                  <span className={styles.lowStock}>
                    <span className={styles.lowStockLabel}>&#x2022; </span>
                    {vinyl.low_stock_label}
                  </span>
                }
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}