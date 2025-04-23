'use client';

// import axios from 'axios';
import Image from 'next/image';
import styles from './page.module.scss';
import WishlistIcon from '../../../../public/wishlist-heart.svg';
import ShareIcon from '../../../../public/share.svg';
import { useState } from 'react';


interface Vinyl {
  product_id: number;
  vinyl_img: string;
  product_href: string;
  vinyl_title: string;
  vinyl_artist: string;
  price: number;
  old_price: number | null;
  sale_label: string | null;
  low_stock_label: string | null;
  no_stock_label: string | null;
  genre: string;
  vinyl_description: string;
  vinyl_info: string;
  playlist_name: string;
  tracklist: string;
  companies: string;
  main_artists: string;
  songwriters: string;
}

interface ProductDetailsProps {
  vinyl: Vinyl,
  vinyl_info:string[][],
}

interface DropdownState {
  description: boolean;
  description2: boolean;
}

export default function ProductDetails({vinyl, vinyl_info}:ProductDetailsProps){
  const [dropdown, setDropdown] = useState<DropdownState>({
    description: false,
    description2: false,
  });

  const handleToggle = (
    setState: React.Dispatch<React.SetStateAction<DropdownState>>,
    key: keyof DropdownState
  ) => {
    setState((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
    console.log("Toggled:", key);
  };

  return (
    <main className={styles.main}>
      <div className={styles.productImage}>
        <Image
          src={vinyl.vinyl_img}
          alt={vinyl.vinyl_title}
          width={650}
          height={650}
          priority
        />
      </div>
      <div className={styles.productDetails}>
        <h1 className={styles.header}>{vinyl.vinyl_title} Vinyl</h1>
        <p className={styles.artist}>{vinyl.vinyl_artist} Vinyl Records</p>
        {/* <p className={styles.genre}>{vinyl.genre}</p> */}
        <div className={styles.priceContainer}>
          {vinyl.old_price && (
            <span className={styles.oldPrice}>
              <s>${vinyl.old_price}</s>
            </span>
          )}
          <span className={styles.price}>${vinyl.price}</span>
          {vinyl.sale_label && (
            <span className={styles.saleTag}> {vinyl.old_price&&vinyl.price ? Math.round((vinyl.price/vinyl.old_price)*10) + "% OFF" : 0}</span>
          )}
          {/* {vinyl.low_stock_label && (
            <span className={styles.lowStock}>{vinyl.low_stock_label}</span>
          )} */}
          {/* {vinyl.no_stock_label && (
            <span className={styles.noStock}>SOLD OUT</span>
          )} */}
        </div>
        {vinyl.no_stock_label ?
          <div className={styles.notifyMe}>
            NOTIFY ME
          </div>
          :
          <div className={styles.addToCartContainer}>
            <div className={styles.addToCart}>
              ADD TO CART
            </div>
            <Image
              src={ShareIcon}
              width={35}
              height={35}
              alt="wishlist"
              className={styles.shareIcon}
            />
          </div>
        }
        <div className={styles.shippingLabel}>
          Free shipping on orders over $60
        </div>
        <div className={styles.wishlistLabelContainer}>
          <Image
            src={WishlistIcon}
            alt="wishlist"
            width={20}
            height={20}
          />
          <div className={styles.wishlistLabel}>
            Add to wishlist
          </div>
        </div>
        <div className={styles.infoContainer}>
          {vinyl_info.map((arr:string[], i:number ) => {
            return(
            <div key={i} className={styles.info}>
              <div className={styles.key}>
                {arr[0]}
              </div>
              <div className={styles.value}>
                : {arr[1]}
              </div>
            </div>
            )
          })}
        </div>
        <div
          className={styles.description}
          onClick={() => handleToggle(setDropdown, 'description')}
        >
          <p>{dropdown.description ? vinyl.vinyl_description : vinyl.vinyl_description.slice(0, 250)+"..."}</p>
          <div className={styles.readMore}>
            {dropdown.description ? 'Show less' : 'Read more'}
          </div>
        </div>
        {/* <div className={styles.tracklist}>
          <h2>Tracklist</h2>
          <p>{vinyl.tracklist}</p>
        </div> */}
        {/* <div className={styles.additionalInfo}>
          <h2>Additional Info</h2>
          <p><strong>Playlist:</strong> {vinyl.playlist_name}</p>
          <p><strong>Companies:</strong> {vinyl.companies}</p>
          <p><strong>Main Artists:</strong> {vinyl.main_artists}</p>
          <p><strong>Songwriters:</strong> {vinyl.songwriters}</p>
          <p><strong>Vinyl Info:</strong> {vinyl.vinyl_info}</p>
        </div> */}
      </div>
    </main>
  );
}