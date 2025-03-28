import styles from '../page.module.scss'
import Image from 'next/image';
import { useEffect, useState, useCallback } from 'react';
import xIcon from '../../../public/x-icon.svg'
import debounce from 'lodash/debounce';

const sampleArtist: string[] = [
  "David Bowie",
  "Nina Simone",
  // "Jimi Hendrix",
  // "Aretha Franklin",
  // "Bob Dylan",
  // "Tina Turner",
  // "Miles Davis",
  // "Patti Smith",
  // "Prince",
  // "Björk",
  // "Freddie Mercury",
  // "Stevie Wonder",
  // "Janis Joplin",
  // "Tom Waits",
  // "Lauryn Hill",
  // "Johnny Cash",
  // "Ella Fitzgerald",
  // "Radiohead",
  // "Fela Kuti",
  // "Amy Winehouse",
];


interface ArtistsProps {
  toggleDropdown: (setState: React.Dispatch<React.SetStateAction<boolean>>)=> void;
  isOpenArtist: boolean;
  setIsOpenArtist: React.Dispatch<React.SetStateAction<boolean>>;
  ArrowIcon: string;
  genre: string[];
  setSelectedArtist: React.Dispatch<React.SetStateAction<string>>;
  selectedArtist: string;
}


export default function Artists ({
  toggleDropdown,
  isOpenArtist,
  setIsOpenArtist,
  ArrowIcon,
  genre,
  selectedArtist,
  setSelectedArtist,
} : ArtistsProps) {
  const [localSelectedArtist, setLocalSelectedArtist] = useState<string>("")

  /*
  Setting local state and debouncing selectedArtist gives immediate feedback
  while keeping the global state in sync
  */
  const debouncedSetArtist = useCallback(
    debounce((value: string) => {
      setSelectedArtist(value);
    }, 300),
    [setSelectedArtist]
  );
  const handleArtistSearch = (e:React.ChangeEvent<HTMLInputElement>) => {
    setLocalSelectedArtist(e.target.value);
    debouncedSetArtist(e.target.value);
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
      <div className={`${styles.artistInputContainer} ${isOpenArtist && styles.open}`}>
        <div className={styles.artistInputWrapper}>
          <input
            type='text'
            placeholder='Artist name'
            value={localSelectedArtist}
            // value={selectedArtist}
            onChange={handleArtistSearch}
            // onChange={(e)=> {
            //   setSelectedArtist(e.target.value)
            //   // setLocalSelectedArtist(e.target.value)

            // }}
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
      </div>
    </div>
  )
}