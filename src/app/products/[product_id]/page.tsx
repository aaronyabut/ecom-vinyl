import axios from 'axios';
import styles from './page.module.scss';
import ProductDetails from './ProductDetails';
import FAQ from './Components/FAQ';
import Recommendations from './Components/Recommendations';

export interface Vinyl {
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

function shuffle(array:Vinyl[]) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
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

async function getRecommendedVinyls(genre: string | undefined, product_id: string): Promise<Vinyl[] | null> {
  try {
    const response = await axios.get(`http://localhost:4000/vinyls?genre=${genre}&stock=true&sale=true&sale=false`);
    const all_vinyls = response.data.all_vinyls;
    const removedCurrent = all_vinyls.filter((vinyl:Vinyl) => vinyl.product_id !== Number(product_id));

    return shuffle([...removedCurrent]);
  } catch (error) {
    console.error('Error fetching vinyl:', error);
    return null;
  }
}

const quoteUpdate = (string: string): string => {
  // Step 1: Store double-quoted strings and replace with placeholders
  const doubleQuoted: string[] = [];
  const placeholderPrefix = '__DOUBLE_QUOTE_';
  let index = 0;

  const withPlaceholders = string.replace(/"((?:[^"\\]|\\.)*?)"/g, (match) => {
    doubleQuoted.push(match);
    return `${placeholderPrefix}${index++}`;
  });

  // Step 2: Replace single quote delimiters with double quotes
  const singleQuoteReplaced = withPlaceholders.replace(/'((?:[^'\\]|\\.)*?)'/g, '"$1"');

  // Step 3: Restore double-quoted strings
  return singleQuoteReplaced.replace(
    new RegExp(`${placeholderPrefix}\\d+`, 'g'),
    () => doubleQuoted.shift() || ''
  );
};

function parseJSON(input:string|undefined|null) {
  const validString = quoteUpdate(input ?? '[]');
  // console.log(validString);
  return JSON.parse(validString);
}

function getThreeUniqueVinyls(vinyls: Vinyl[] | null) {
  // Return null if vinyls is null or has fewer than 3 items
  if (!vinyls || vinyls.length < 3) {
    console.warn('Insufficient or invalid vinyls array:', vinyls);
    return null;
  }

  // Generate 3 unique random indices
  const numbers: Set<number> = new Set();
  while (numbers.size < 3) {
    const randomNum = Math.floor(Math.random() * vinyls.length); // Use vinyls.length to avoid out-of-bounds
    numbers.add(randomNum);
  }

  // Convert Set to array of indices
  const indices: number[] = [...numbers];

  // Map indices to corresponding vinyls
  const selectedVinyls: Vinyl[] = indices.map((index) => vinyls[index]);

  return selectedVinyls;
}

export default async function ProductPage({params}:{params:Promise<{ product_id: string}>}){
  const {product_id} = await params;
  const vinyl = await getVinylById(product_id);
  const recommendedVinyls = await getRecommendedVinyls(vinyl?.genre, product_id);
  const pairings = getThreeUniqueVinyls(recommendedVinyls) || [];

  // console.log(recommendedVinyls)
  // console.log(pairings)

  const playlistNameString = vinyl?.playlist_name ?? '';

  const vinyl_info = parseJSON(vinyl?.vinyl_info);
  const tracklist = parseJSON(vinyl?.tracklist);
  const companies = parseJSON(vinyl?.companies);
  const artists = parseJSON(vinyl?.main_artists);
  const songwriters = parseJSON(vinyl?.songwriters);

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
    <div className={styles.page}>
      <ProductDetails
        vinyl={vinyl}
        vinyl_info={vinyl_info}
        tracklist={tracklist}
        playlist_name={playlistNameString}
        companies={companies}
        artists={artists}
        songwriters={songwriters}
        pairings={pairings}
      />
      <FAQ />
      <Recommendations recommendedVinyls={recommendedVinyls}/>
    </div>
  );
}