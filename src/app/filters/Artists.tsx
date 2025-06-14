import styles from '../page.module.scss'
import Image from 'next/image';
import { useState, useCallback } from 'react';
import xIcon from '../../../public/x-icon.svg'
import debounce from 'lodash/debounce';

interface ArtistState {
  selecting: string;
  selectingList: string[];
  selected: string[];
}


interface ArtistsProps {
  toggleDropdown: (setState: React.Dispatch<React.SetStateAction<boolean>>)=> void;
  isOpenArtist: boolean;
  setIsOpenArtist: React.Dispatch<React.SetStateAction<boolean>>;
  ArrowIcon: string;
  artistFilter:ArtistState
  setArtistFilter: React.Dispatch<React.SetStateAction<ArtistState>>;
}


export default function Artists ({
  toggleDropdown,
  isOpenArtist,
  setIsOpenArtist,
  ArrowIcon,
  // genre,
  artistFilter,
  setArtistFilter,
} : ArtistsProps) {
  const [localSelectingArtist, setLocalSelectingArtist] = useState<string>("")

  /*
   * Setting local state and debouncing selectingArtist gives immediate feedback
   * while keeping the global state in sync
   */
  const debouncedSetArtist = useCallback(
    debounce((value: string) => {
      setArtistFilter(prev => ({ ...prev, selecting: value }))
    }, 300), []
  );
  const handleArtistSearch = (e:React.ChangeEvent<HTMLInputElement>) => {
    setLocalSelectingArtist(e.target.value);
    debouncedSetArtist(e.target.value);
  }

  const handleOnClickArtist = (artist:string) => {
    if (!artistFilter.selected.includes(artist)) {
      setArtistFilter(prev => ({ ...prev, selected: [...prev.selected, artist] }))
    }
    setArtistFilter(prev => ({ ...prev, selecting: ""}))
    setLocalSelectingArtist("");
  }

  const handleRemoveArtist = (artist:string) => {
    setArtistFilter(prev => ({
      ...prev,
      selected: prev.selected.filter(val => val !== artist)
    }))
  };

  return (
    <div>
      <div
        className={`${styles.artistStyling} ${isOpenArtist && styles.active}`}
        onClick={()=>toggleDropdown(setIsOpenArtist)}
      >
        <legend className={`${artistFilter.selected.length ? styles.contained_header : ''}`}>
          Artist {artistFilter.selected.length ? `(${artistFilter.selected.length})` : ''}
        </legend>
        <Image
          src={ArrowIcon}
          width={15}
          height={15}
          alt="arrow icon"
          className={`${isOpenArtist ? styles.rotateIcon : styles.rotateIconReverse} ${artistFilter.selected.length ? styles.contained_icon : ''}`}
        />
      </div>
      <div className={`${styles.artistInputContainer}
        ${isOpenArtist && styles.open}`
        // ${true && styles.open}`
      }>
        <div className={styles.artistInputWrapper}>
          <input
            type='text'
            placeholder='Artist name'
            value={localSelectingArtist}
            onChange={handleArtistSearch}
          />
          <button className={styles.artistSearchButton}>
            Search
          </button>
        </div>
          <div className={styles.artistListContainer}>
            {
              artistFilter.selectingList.map((artist:string,i:number) => {
                return (
                  <div className={styles.artist} key={i} onClick={()=>handleOnClickArtist(artist)}>
                    {artist}
                  </div>
                )
            })}
          </div>
        <div className={`${styles.chosenArtistContainer} ${artistFilter.selected.length > 0 && styles.active}`}>
          {artistFilter.selected.map((artist:string,i:number) => {
            return (
              <div className={styles.chosenArtist} key={i}>
                {artist}
                <Image
                  src={xIcon}
                  width={11}
                  height={11}
                  alt="arrow icon"
                  className={styles.XIcon}
                  onClick={()=>handleRemoveArtist(artist)}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}