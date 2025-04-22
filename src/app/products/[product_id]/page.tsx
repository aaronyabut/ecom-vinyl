import axios from 'axios';

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



  return (
    <h1>{vinyl?.vinyl_title}</h1>

  );
}