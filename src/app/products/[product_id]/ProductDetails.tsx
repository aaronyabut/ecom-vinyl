'use client';

// import axios from 'axios';
import Image from 'next/image';
import styles from './page.module.scss';
import WishlistIcon from '../../../../public/wishlist-heart.svg';
import ShareIcon from '../../../../public/share.svg';
import { useState } from 'react';
import ArrowIcon from '../../../../public/arrow-icon.svg'
// import { drop } from 'lodash';


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
  tracklist:string[][],
  playlist_name:string,
  companies:string[][],
  artists:string[][],
  songwriters:string[][]

}

interface DropdownState {
  description: boolean;
  tracklist: boolean;
  credits: boolean;
}

export default function ProductDetails({
  vinyl,
  vinyl_info,
  tracklist,
  playlist_name,
  companies,
  artists,
  songwriters

}:ProductDetailsProps){
  const [dropdown, setDropdown] = useState<DropdownState>({
    description: false,
    tracklist: false,
    credits: false,
  });

  const handleToggle = (
    setState: React.Dispatch<React.SetStateAction<DropdownState>>,
    key: keyof DropdownState
  ) => {
    setState((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
    console.log("tracklist", typeof tracklist)
    // console.log("Toggled:", key);
    // console.log("VALUE:", dropdown.tracklist);
  };

  console.log("companies",companies)
  console.log("artists",artists)
  console.log("songwriters",songwriters)

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
        {/* Description */}
        {
          vinyl.vinyl_description ?
          <div
            className={styles.description}
            onClick={() => handleToggle(setDropdown, 'description')}
          >
            <p>{dropdown.description ? vinyl.vinyl_description : vinyl.vinyl_description.slice(0, 250)+"..."}</p>
            <div className={styles.readMore}>
              {dropdown.description ? 'Show less' : 'Read more'}
            </div>
          </div>
          : null
        }
        {/* Tracklist */}
        {
          tracklist.length ?
          <div className={styles.tracklistContainer}>
            <div
              className={styles.tracklistHeader}
              onClick={() => handleToggle(setDropdown, 'tracklist')}
              >
              <h2>Album tracklist</h2>
              <Image
                src={ArrowIcon}
                height={20}
                width={20}
                alt='arrow icon'
                className={`${dropdown.tracklist ? styles.rotateIcon : styles.rotateIconReverse}`}
              />
            </div>
            <div className={`${styles.tracklistDropdownContainer} ${dropdown.tracklist && styles.open}`}>
              <div className={styles.tracklistMainInfoContainer}>
                <Image
                  src={vinyl.vinyl_img}
                  alt={vinyl.vinyl_title}
                  width={110}
                  height={110}
                  priority
                />
                <div className={styles.albumInfo}>
                  <div>
                    {playlist_name}
                  </div>
                  <div className={styles.artist}>
                  {/* <div> */}
                    {vinyl.vinyl_artist} • {tracklist.length} songs
                  </div>
                </div>
              </div>
              <div className={`${styles.tracklistSongs}`}>
                {tracklist.map((arr:string[],i) => {
                  return (
                    <div key={i} className={styles.songContainer}>
                      <div className={styles.trackNumberAndTitle}>
                        <div className={styles.trackNumber}>
                          {arr[0]}
                        </div>
                        <div className={styles.songTitle}>
                          {arr[1]}
                        </div>
                      </div>
                      <div className={styles.songDuration}>
                        {arr[2]}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          : null
        }
        {/* Credits */}
        {
          companies.length || artists.length || songwriters.length ?
          <div className={styles.creditsContainer}>
            <div
              className={styles.creditsHeader}
              onClick={() => handleToggle(setDropdown, 'credits')}
              >
              <h2>Credits</h2>
              <Image
                src={ArrowIcon}
                height={20}
                width={20}
                alt='arrow icon'
                className={`${dropdown.credits ? styles.rotateIcon : styles.rotateIconReverse}`}
              />
            </div>
            <div className={`${styles.categoryContainer} ${dropdown.credits && styles.open}`} >
              {/* <div>{artists}</div> */}
              {/* <div>{companies}</div>
              <div>{songwriters}</div> */}
            </div>
          </div>
          : null
        }
      </div>
    </main>
  );
}