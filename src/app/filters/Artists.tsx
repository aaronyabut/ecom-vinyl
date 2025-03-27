import styles from '../page.module.scss'
import Image from 'next/image';
import { useEffect, useState } from 'react';
import xIcon from '../../../public/x-icon.svg'

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
      {/* <div className={``}> */}
        <div className={`${styles.artistInputContainer}
          ${true && styles.open}
        `}>
          {/* ${isOpenArtist && styles.open} */}
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
          <div className={styles.artistListContainer}>
            {sampleArtist.map((artist:string,i:number) => {
              return (
                <div className={styles.artist} key={i}>
                  {artist}
                </div>
              )
            })}
          </div>
          <div className={styles.chosenArtistContainer}>
            {sampleArtist.map((artist:string,i:number) => {
              return (
                <div className={styles.chosenArtist} key={i}>
                  {artist}
                  <Image
                    src={xIcon}
                    width={12}
                    height={12}
                    alt="arrow icon"
                    className={styles.XIcon}
                  />
                </div>
              )
            })}
          </div>
        {/* </div> */}
      </div>
    </div>
  )
}