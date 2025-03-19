'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './page.module.scss';
import Image from 'next/image';
import WishlistIcon from '../../public/wishlist-heart.svg';
import ArrowIcon from '../../public/arrow-icon.svg'
import DualRangeSlider from './utils/DualRangeSlider';

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

const checkCurrent: string = "sale"

const MIN:number = 4;
const MAX:number = 1000;

const genres: string[] = ['Blues', 'Rock', 'Country', 'Jazz', 'RnB / Soul', 'Pop']

export default function VinylFilter({ initialVinyls }: { initialVinyls: Vinyl[] }) {
  const [vinyls, setVinyls] = useState(initialVinyls);
  const [genre, setGenre] = useState<string[]>([]);
  const [isOpenGenre, setIsOpenGenre] = useState<boolean>(false);
  const [isOpenArtist, setIsOpenArtist] = useState<boolean>(false);
  const [isOpenPrice, setIsOpenPrice] = useState<boolean>(false);
  const [stock, setStock] = useState<boolean>(true);
  const [sale, setSale] = useState<boolean>(false);



  const [minValue, setMinValue] = useState<number>(MIN);
  const [maxValue, setMaxValue] = useState<number>(MAX);

  const toggleDropdown = (setState: any) => {
    setState((prev:any) => !prev);
  };

  const handleCheckboxStock = (e:any) => {
    setStock(!stock);
  }
  const handleCheckboxSale = (e:any) => {
    setSale(!sale);
  }

  const handleCheckboxChange = (e:any) => {
    const value:any = e.target.value;
    const checked:any = e.target.checked;

    if (checked) {
      setGenre([...genre, value])
    } else {
      setGenre(genre.filter(item => item !== value))
    }
  }

  const handleresetAll = () => {
    genres.forEach((currentGenre: string) => {
      const genreVal = currentGenre.toLowerCase();
      const checkbox = document.getElementById(genreVal) as HTMLInputElement;
      if (checkbox && checkbox.checked) {
        checkbox.checked = false;
        handleCheckboxChange({ target: checkbox }); // Trigger handler for each unchecked box
      }
    });
    setGenre([]);
    setStock(true);
    setSale(false);
  };


  useEffect(() => {
    async function fetchFilteredVinyls() {
      try {
        let url = genre.length
          ? `http://localhost:4000/vinyls?${genre.map(g => `genre=${g}`).join('&')}`
          : 'http://localhost:4000/vinyls';
        // url = sale && url += "";

        console.log(url);
        const response = await axios.get(url);
        setVinyls(response.data);
      } catch (error) {
        console.error('Error fetching filtered vinyls:', error);
        setVinyls([]);
      }
    }
    fetchFilteredVinyls();
  }, [genre, sale]); // Refetch when genre changes

  return (
    <div className={styles.mainLayout}>
      <div className={styles.filter}>
        <div className={styles.filterHeaders}>
          <span>Filter by</span>
          <span className={styles.resetAll}><button onClick={handleresetAll}>Reset all</button></span>
        </div>
        <div
          className={`${styles.genreStyling} ${isOpenGenre ? styles.active : ''}`}
          onClick={()=>toggleDropdown(setIsOpenGenre)}
        >
          <legend className={`${genre.length && styles.contained2}`}>
            Genre {`${genre.length ? `(${genre.length})`: ''}`}
          </legend>

          <Image
            src={ArrowIcon}
            width={15}
            height={15}
            alt="arrow icon"
            className={`${isOpenGenre ? styles.rotateIcon : styles.rotateIconReverse} ${genre.length && styles.contained}`}
          />
        </div>
        <div className={`${styles.genreList} ${isOpenGenre && styles.open}`}>
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
        <div
          // className={`${styles.artistStyling}`}
          className={`${styles.artistStyling} ${isOpenArtist && styles.active}`}
          onClick={()=>toggleDropdown(setIsOpenArtist)}
        >
          <legend>
            Artist
          </legend>
          <Image
            src={ArrowIcon}
            width={15}
            height={15}
            alt="arrow icon"
            className={`${isOpenArtist ? styles.rotateIcon : styles.rotateIconReverse} ${genre.length && styles.contained}`}
          />
        </div>
        <div className={`${styles.artistInputContainer} ${isOpenArtist && styles.open}`}>
          <div className={styles.artistInputWrapper}>
            <input
              type='text'
              placeholder='Artist name'
            />
            <button className={styles.artistSearchButton}>
              Search
            </button>
          </div>
        </div>
        <div
          className={`${styles.priceStyling} ${isOpenPrice && styles.active}`}
          onClick={()=>toggleDropdown(setIsOpenPrice)}
        >
          <legend>
            Price
          </legend>
          <Image
            src={ArrowIcon}
            width={15}
            height={15}
            alt="arrow icon"
            className={`${isOpenPrice ? styles.rotateIcon : styles.rotateIconReverse} ${genre.length && styles.contained}`}
          />
        </div>
        <div className={`${styles.priceContainer} ${isOpenPrice && styles.open}`}>
          <DualRangeSlider
            setMinValue={setMinValue}
            setMaxValue={setMaxValue}
            minValue={minValue}
            maxValue={maxValue}
            MIN={MIN}
            MAX={MAX}
          />
        </div>
        <div className={styles.stock}>
          <div>
            Show only in stock
          </div>
          <label className={`${styles.toggle} ${stock ? styles.checked : ''}`}>
            <input
              type="checkbox"
              checked={stock}
              onChange={handleCheckboxStock}
            />
            <span className={styles.slider}></span>
          </label>
        </div>
        <div className={styles.stock}>
          <div>
            Show only on sale
          </div>
          <label className={`${styles.toggle} ${sale ? styles.checked : ''}`}>
            <input
              type="checkbox"
              checked={sale}
              onChange={handleCheckboxSale}
            />
            <span className={styles.slider}></span>
          </label>
        </div>
        <div className={styles.forChecking}
          onClick={()=>alert(`${checkCurrent.toUpperCase()}: ${sale}`)}
        >
          Check current: [{checkCurrent.toUpperCase()}]
        </div>
      </div>
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
                    alt={`${vinyl.vinyl_title} by ${vinyl.vinyl_artist}`}
                    className={styles.image}
                  />
                  <div className={styles.toCart}>
                    ADD TO CART
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
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}