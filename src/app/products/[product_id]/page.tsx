import axios from 'axios';
import Image from 'next/image';
import styles from './page.module.scss';
import WishlistIcon from '../../../../public/wishlist-heart.svg';
import ShareIcon from '../../../../public/share.svg';

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

async function getVinylById(product_id: string): Promise<Vinyl | null> {
  try {
    const response = await axios.get(`http://localhost:4000/vinyls/${product_id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching vinyl:', error);
    return null;
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ product_id: string }>;
}) {
  const { product_id } = await params;
  const vinyl = await getVinylById(product_id);
  const infoString = vinyl?.vinyl_info ?? '[]'; // Fallback to an empty array string
  const validJsonString = infoString.replace(/'([^']+)'/g, '"$1"');
  let vinyl_info = [];
  try {
    vinyl_info = JSON.parse(validJsonString);
    console.log(vinyl_info);
  } catch (error) {
    console.error('Error parsing JSON:', error);
  }


  if (!vinyl) {
    return (
      <div className={styles.page}>
        <main className={styles.main}>
          <h1>Vinyl Not Found</h1>
          <p>No vinyl found with ID {product_id}.</p>
        </main>
      </div>
    );
  }


  // console.log("CHECKCECHEKCKEHC",vinyl_info)

  return (
    // <div>
    <div className={styles.page}>
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
          <h1 className={styles.header}>{vinyl.vinyl_title}</h1>
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
        </div>
      </main>
    </div>
  );
}