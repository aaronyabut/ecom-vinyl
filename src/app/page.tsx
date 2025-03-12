import axios from 'axios';
import styles from './page.module.scss';
import VinylFilter from './VinylFilter'; // New Client Component

interface Vinyl {
  product_id: number;
  vinyl_img: string | null;
  product_href: string | null;
  vinyl_title: string;
  vinyl_artist: string;
  price: number;
  old_price: number | null;
  sale_label: string | null;
  low_stock_label: string | null;
  genre: string;
  vinyl_description: string | null;
}

async function getVinyls(): Promise<Vinyl[]> {
  try {
    const response = await axios.get('http://localhost:4000/vinyls');
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
        <h1>Vinyl Store</h1>
        <VinylFilter initialVinyls={initialVinyls} />
      </main>
    </div>
  );
}