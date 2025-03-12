'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './page.module.scss';

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

export default function VinylFilter({ initialVinyls }: { initialVinyls: Vinyl[] }) {
  const [vinyls, setVinyls] = useState(initialVinyls);
  const [genre, setGenre] = useState('');

  useEffect(() => {
    async function fetchFilteredVinyls() {
      try {
        const url = genre
          ? `http://localhost:4000/vinyls?genre=${genre}`
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
    <div>
      <select
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        className={styles.filter}
      >
        <option value="">All Genres</option>
        <option value="blues">Blues</option>
        <option value="rock">Rock</option>
        {/* Add more genres from your CSV */}
      </select>
      {vinyls.length === 0 ? (
        <p>No vinyls available.</p>
      ) : (
        <ul>
          {vinyls.map((vinyl) => (
            <li key={vinyl.product_id}>
              <strong>{vinyl.vinyl_title}</strong> by {vinyl.vinyl_artist} - ${vinyl.price}
              {vinyl.old_price && <span> (Was ${vinyl.old_price})</span>}
              {vinyl.sale_label && <span> - {vinyl.sale_label}</span>}
              {vinyl.low_stock_label && <span> - {vinyl.low_stock_label}</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}