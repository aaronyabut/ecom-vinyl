import axios from 'axios';
// import Image from 'next/image';
import styles from './page.module.scss';
// import WishlistIcon from '../../../../public/wishlist-heart.svg';
// import ShareIcon from '../../../../public/share.svg';
import ProductDetails from './ProductDetails';

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

  return (
    // <div>
    <div className={styles.page}>
      <ProductDetails
        vinyl={vinyl}
        vinyl_info={vinyl_info}
      />
    </div>
  );
}