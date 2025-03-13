'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './page.module.scss';

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

const genres: string[] = ['Blues', 'Rock', 'Country', 'Jazz', 'RnB / Soul', 'Pop']

export default function VinylFilter({ initialVinyls }: { initialVinyls: Vinyl[] }) {
  const [vinyls, setVinyls] = useState(initialVinyls);
  const [genre, setGenre] = useState<string[]>([]);

  const handleCheckboxChange = (e:any) => {
    const value:any = e.target.value;
    const checked:any = e.target.checked;

    if (checked) {
      setGenre([...genre, value])
    } else {
      setGenre(genre.filter(item => item !== value))
    }
  }

  useEffect(() => {
    async function fetchFilteredVinyls() {
      try {
        const url = genre.length
          ? `http://localhost:4000/vinyls?${genre.map(g => `genre=${g}`).join('&')}`
          : 'http://localhost:4000/vinyls';
        const response = await axios.get(url);
        setVinyls(response.data);
      } catch (error) {
        console.error('Error fetching filtered vinyls:', error);
        setVinyls([]);
      }
    }
    fetchFilteredVinyls();
  }, [genre]); // Refetch when genre changes

  return (
    <div className={styles.mainLayout}>
      <fieldset className={styles.filter}>
        <legend>Genre</legend>
        {
          genres.map((currentGenre:string, i:number) => {
            let genreVal: string = currentGenre.toLowerCase();
            return (
              <div key={i}>
                <label htmlFor={genreVal}>
                  <input
                    type="checkbox"
                    name={genreVal}
                    id={genreVal}
                    value={genreVal}
                    onChange={handleCheckboxChange}
                  />
                  {currentGenre}
                </label>
              </div>
            );
          })
        }
      </fieldset>
      {/* <button onClick={()=>setGenre([])}>
        RESET FILTER
      </button>
      <button onClick={()=>console.log(`Current genre array: ${genre}`)}>
        CLICK TO CHECK
      </button> */}
      <div className={styles.products}>
        {vinyls.length === 0 ? (
          <p>No vinyls available.</p>
        ) : (
          <ul>
            {vinyls.map((vinyl) => (
              <li key={vinyl.product_id}>
                <strong>
                  {vinyl.genre.toUpperCase()}:: &nbsp;
                </strong>
                <strong>{vinyl.vinyl_title}</strong> by {vinyl.vinyl_artist} - ${vinyl.price}
                {vinyl.old_price && <span> (Was ${vinyl.old_price})</span>}
                {vinyl.sale_label && <span> - {vinyl.sale_label}</span>}
                {vinyl.low_stock_label && <span> - {vinyl.low_stock_label}</span>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}