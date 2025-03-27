import styles from '../page.module.scss'
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface ArtistsProps {
  toggleDropdown: (setState: React.Dispatch<React.SetStateAction<boolean>>)=> void;
  isOpenArtist: boolean;
  setIsOpenArtist: React.Dispatch<React.SetStateAction<boolean>>;
  ArrowIcon: string;
  genre: string[];
}
const sampleArtist: string[] = [
  "David Bowie",
  "Nina Simone",
  "Jimi Hendrix",
  "Aretha Franklin",
  "Bob Dylan",
  "Tina Turner",
  "Miles Davis",
  "Patti Smith",
  "Prince",
  "Björk",
  "Freddie Mercury",
  "Stevie Wonder",
  "Janis Joplin",
  "Tom Waits",
  "Lauryn Hill",
  "Johnny Cash",
  "Ella Fitzgerald",
  "Radiohead",
  "Fela Kuti",
  "Amy Winehouse",
];

export default function Artists ({toggleDropdown, isOpenArtist, setIsOpenArtist, ArrowIcon, genre} : ArtistsProps) {

  const handleArtistSearch = () => {

  }

  useEffect (() => {

  }, [])

  return (
    <div>
      <div
        className={`${styles.artistStyling} ${isOpenArtist && styles.active}`}
        onClick={()=>toggleDropdown(setIsOpenArtist)}
      >
        <legend>
          Artist
        </legend>
        <Image
          src={ArrowIcon}
          width={15}
          height={15}
          alt="arrow icon"
          className={`${isOpenArtist ? styles.rotateIcon : styles.rotateIconReverse} ${genre.length && styles.contained}`}
        />
      </div>
      <div >
        <div className={`${styles.artistInputContainer} ${isOpenArtist && styles.open}`}>
          <div className={styles.artistInputWrapper}>
            <input
              type='text'
              placeholder='Artist name'
              // value={}
            />
            <button className={styles.artistSearchButton}>
              Search
            </button>
          </div>
        </div>
        {/* <div>
          LIST OF ALL ARTISTS
        </div>
        <div>
          CHOSEN ARTIST
        </div> */}
      </div>
    </div>
  )
}