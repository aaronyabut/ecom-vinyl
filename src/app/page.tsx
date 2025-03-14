import axios from 'axios';
import styles from './page.module.scss';
import VinylFilter from './VinylFilter'; // New Client Component

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
  genre: string;
  vinyl_description: string;
}

async function getVinyls(): Promise<Vinyl[]> {
  try {
    const response = await axios.get('http://localhost:4000/vinyls'); // Updated
    return response.data;
  } catch (error) {
    console.error('Error fetching vinyls:', error);
    return [];
  }
}

export default async function Home() {
  const initialVinyls = await getVinyls();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.mainTitle}>SHOP VINYL</div>
        <VinylFilter initialVinyls={initialVinyls} />
      </main>
    </div>
  );
}