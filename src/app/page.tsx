import axios from 'axios';
import styles from './page.module.scss';
import VinylFilter from './products/VinylFilter';
import Image from 'next/image';

interface minMaxTypes {
  min_price: number;
  max_price: number;
}
interface totalCountTypes {
  total_count: number;
}

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

interface getVinylsTypes {
  all_vinyls: Vinyl[];
  min_max: minMaxTypes[];
  total_count: totalCountTypes[]

}

async function getVinyls(): Promise<getVinylsTypes> {
  try {
    const response = await axios.get('http://localhost:4000/vinyls?stock=true');

    return response.data;
  } catch (error) {
    console.error('Error fetching vinyls:', error);
    return {
      all_vinyls: [],
      min_max: [],
      total_count: [],
    };
  }
}

export default async function Home() {
  const {
    all_vinyls:initialVinyls,
    min_max:[{min_price, max_price}],
    total_count: [{total_count}]
  } = await getVinyls();

  const initialMin = Math.floor(Number(min_price));
  const initialMax = Math.ceil(Number(max_price));
  const initialTotalCount = Number(total_count);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <VinylFilter
          initialVinyls={initialVinyls}
          initialMin={initialMin}
          initialMax={initialMax}
          initialTotalCount={initialTotalCount}
        />
      </main>
      <div className={styles.banner}>
        <div className={styles.bannerWrapper}>
          <div className={styles.itemWrapper}>
            <Image
              src="https://vinyl.com/cdn/shop/t/59/assets/trunk.svg"
              height={50}
              width={50}
              alt='shipping truck'
            />
            Free Shipping
          </div>
          <div className={styles.itemWrapper}>
            <Image
              src="https://vinyl.com/cdn/shop/t/59/assets/hand-coins.svg"
              height={50}
              width={50}
              alt='hand coin'
            />
            Buy Now Pay Later
          </div>
          <div className={styles.itemWrapper}>
            <Image
              src="https://vinyl.com/cdn/shop/t/59/assets/vinyl-record.svg"
              height={50}
              width={50}
              alt='vinyl record'
            />
            50k+ Titles
          </div>
          <div className={styles.itemWrapper}>
            <Image
              src="https://vinyl.com/cdn/shop/t/59/assets/tenplus.svg"
              height={50}
              width={50}
              alt='ten plus'
            />
            Happy Customers
          </div>
        </div>
      </div>
    </div>
  );
}