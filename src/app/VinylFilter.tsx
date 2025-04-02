'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './page.module.scss';
import Image from 'next/image';
import WishlistIcon from '../../public/wishlist-heart.svg';
import ArrowIcon from '../../public/arrow-icon.svg'
import DualRangeSlider from './utils/DualRangeSlider';
import Artists from './filters/Artists';


/*/[[Feature list]]
 * Fix min-max, get all min-max not only those that are shown   [DONE]
 * Hide Show more button when there no more vinyls              [DONE]
 * Make reset only show when filter is empty                     [DONE]
 * Fix sorting to be implemented through the backend            [next]
/*/

/*/[[TODO]]
 * Fix sorting to be implemented through the backend
/*/

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
  genre: string;
  vinyl_description: string;
}
interface getVinylsTypes {
  initialVinyls: Vinyl[];
  initialMin: number;
  initialMax: number;
  initialTotalCount: number;

}

interface Sorting {
  variation: string;
  cb:(vinyls: Vinyl[]) => Vinyl[];
}

interface ArtistState {
  selecting: string;
  selectingList: string[];
  selected: string[];
}

interface ShowMoreState {
  offsetValue: number;
  toShow: boolean;
}

const genres: string[] = ['Blues', 'Rock', 'Country', 'Jazz', 'RnB / Soul', 'Pop'];
// const sorts: Sorting[] = [
//   {
//     variation: "Most popular",
//     // [...vinyls] creates a shallow copy to prevent mutation
//     cb: (vinyls: Vinyl[]) => [...vinyls].sort((a, b) => a.product_id - b.product_id),
//   },
//   {
//     variation: "Price: Low to High",
//     cb: (vinyls: Vinyl[]) => [...vinyls].sort((a, b) => a.price - b.price),
//   },
//   {
//     variation: "Price: High to Low",
//     cb: (vinyls: Vinyl[]) => [...vinyls].sort((a, b) => b.price - a.price),
//   },
//   {
//     variation: "Artist: A-Z",
//     cb: (vinyls: Vinyl[]) => [...vinyls].sort((a, b) => a.vinyl_artist.localeCompare(b.vinyl_artist)),
//   },
//   {
//     variation: "Artist: Z-A",
//     cb: (vinyls: Vinyl[]) => [...vinyls].sort((a, b) => b.vinyl_artist.localeCompare(a.vinyl_artist)),
//   },
//   {
//     variation: "Album: A-Z",
//     cb: (vinyls: Vinyl[]) => [...vinyls].sort((a, b) => a.vinyl_title.localeCompare(b.vinyl_title)),
//   },
//   {
//     variation: "Album: Z-A",
//     cb: (vinyls: Vinyl[]) => [...vinyls].sort((a, b) => b.vinyl_title.localeCompare(a.vinyl_title)),
//   },
// ];
const sorts: Sorting[] = [
  {
    variation: "Most popular",
    // [...vinyls] creates a shallow copy to prevent mutation
    cb: (vinyls: Vinyl[]) => [...vinyls].sort((a, b) => a.product_id - b.product_id),
  },
  {
    variation: "Price: Low to High",
    cb: (vinyls: Vinyl[]) => [...vinyls].sort((a, b) => a.price - b.price),
  },
  {
    variation: "Price: High to Low",
    cb: (vinyls: Vinyl[]) => [...vinyls].sort((a, b) => b.price - a.price),
  },
  {
    variation: "Artist: A-Z",
    cb: (vinyls: Vinyl[]) => [...vinyls].sort((a, b) => a.vinyl_artist.localeCompare(b.vinyl_artist)),
  },
  {
    variation: "Artist: Z-A",
    cb: (vinyls: Vinyl[]) => [...vinyls].sort((a, b) => b.vinyl_artist.localeCompare(a.vinyl_artist)),
  },
  {
    variation: "Album: A-Z",
    cb: (vinyls: Vinyl[]) => [...vinyls].sort((a, b) => a.vinyl_title.localeCompare(b.vinyl_title)),
  },
  {
    variation: "Album: Z-A",
    cb: (vinyls: Vinyl[]) => [...vinyls].sort((a, b) => b.vinyl_title.localeCompare(a.vinyl_title)),
  },
];

export default function VinylFilter({ initialVinyls,initialMin,initialMax,initialTotalCount }: getVinylsTypes) {
  const [vinyls, setVinyls] = useState(initialVinyls);
  const [genre, setGenre] = useState<string[]>([]);
  const [isOpenGenre, setIsOpenGenre] = useState<boolean>(false);
  const [isOpenArtist, setIsOpenArtist] = useState<boolean>(false);
  const [isOpenPrice, setIsOpenPrice] = useState<boolean>(false);
  const [isOpenSort, setIsOpenSort] = useState<boolean>(false);
  const [stock, setStock] = useState<boolean>(true);
  const [sale, setSale] = useState<boolean>(false);
  const [min, setMin] = useState<number>(initialMin);
  const [max, setMax] = useState<number>(initialMax);
  const [selectedMin, setSelectedMin] = useState<number>(min);
  const [selectedMax, setSelectedMax] = useState<number>(max);
  const [selectedSort, setSelectedSort] = useState<string>("Most popular");
  // Trying out grouping useStates
  const [artistFilter, setArtistFilter] = useState<ArtistState>({
    selecting: "",
    selectingList:[],
    selected: [],
  })
  const [showMore, setShowMore] = useState<ShowMoreState>({
    offsetValue: 0,
    toShow: initialTotalCount >= 24 ? true : false,
  })
  const [showReset, setShowReset] = useState<boolean>(false);
  // const [isPriceRangeAdjusted, setIsPriceRangeAdjusted] = useState<boolean>(false);

  const checkCurrent = "showMore ";
  const handleCheckCurrent = () => {
    // console.log(vinyls);
  };

  const toggleDropdown = (setState: React.Dispatch<React.SetStateAction<boolean>>) => {
    setState((prev:boolean) => !prev);
  };

  const handleShowMore = () => {
    setShowMore(prev => ({
      ...prev,
      offsetValue: prev.offsetValue+24
    }))
    console.log(showMore.offsetValue);
  }

  const handleCheckboxStock = (e:React.ChangeEvent<HTMLInputElement>) => {
    setStock(!stock);
  };
  const handleCheckboxSale = (e:React.ChangeEvent<HTMLInputElement>) => {
    setSale(!sale);
  };

  const handleSortChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const currentSelectedSort = e.target.value;
    const currentSelectedSortObj = JSON.parse(currentSelectedSort);

    setSelectedSort(currentSelectedSortObj.variation);
    setIsOpenSort(false);

    // Find the matching sort function
    const sortFunction = sorts.find(sort => sort.variation === currentSelectedSortObj.variation)?.cb;

    /*/
     * If sort function is present, setVinyls by using a functional update
     * The prevVinyls parameter is the current value of that state
    /*/
    if (sortFunction) setVinyls((prevVinyls) => sortFunction(prevVinyls));
  }

  const handleCheckboxChange = ({ value, checked }: { value: string; checked: boolean }) => {
    if (checked) {
      setGenre([...genre, value]);
    } else {
      setGenre(genre.filter((item) => item !== value));
    }
  };
  const onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    handleCheckboxChange({ value, checked });
  };

  const handleResetAll = () => {
    genres.forEach((currentGenre: string) => {
      const genreVal = currentGenre.toLowerCase();
      const checkbox = document.getElementById(genreVal) as HTMLInputElement;
      if (checkbox && checkbox.checked) {
        checkbox.checked = false;
        handleCheckboxChange({ value: checkbox.value, checked: false });
      }
    });

    setGenre([]);
    setStock(true);
    setSale(false);
    setSelectedSort("Most Popular")
    setArtistFilter(prev => ({
      ...prev,
      selected: []
    }))
  };

  // MAIN Fetch all the vinyl according to the filter
  useEffect(() => {
    async function fetchFilteredVinyls() {
      try {
        let url = 'http://localhost:4000/vinyls';
        const conditions = [];

        if (sale) conditions.push(`sale=${true}`);
        if (genre.length) conditions.push(genre.map(g => `genre=${g}`).join('&'));
        if (artistFilter.selected.length) {
          conditions.push(artistFilter.selected.map(a => `artist=${a}`).join('&'))
        };
        conditions.push(`min-price=${selectedMin}&max-price=${selectedMax}`)
        //combine all conditions for API request URL
        if (conditions.length > 0) url += "?" + conditions.join('&');

        const response = await axios.get(url);
        const all_vinyls = response.data.all_vinyls;

        // If total vinyls is less/equal to 24 count
        const total_count = Number(response.data.total_count[0].total_count);
        if (total_count <= showMore.offsetValue+24) {
          // Hide 'show more' button
          setShowMore((prev) => ({
            ...prev,
            toShow: false
          }))
        } else {
          // Show 'show more' button
          setShowMore((prev) => ({
            ...prev,
            toShow: true
          }))
        }
        // Reset show more offset count
        setShowMore((prev) => ({
          ...prev,
          offsetValue: 0
        }))

        // Ensures that the selected sort is still implemented when filtering new data
        const sortFunction = sorts.find(sort => sort.variation === selectedSort)?.cb
        if (sortFunction) {
          setVinyls(sortFunction(all_vinyls));
        } else {
          setVinyls(all_vinyls);
          setSelectedSort('Most Popular')
        }

        // If any of these values are false, is default state will be we false
        const isDefaultState = [
          artistFilter.selected.length === 0,
          genre.length === 0,
          sale === false,
          stock === true,
          selectedMin === min,
          selectedMax === max
        ].every(Boolean);

        setShowReset(!isDefaultState);

      } catch (error) {
        console.error('Error fetching filtered vinyls:', error);
        setVinyls([]);
      }
    }
    fetchFilteredVinyls();
  }, [genre, sale, selectedMin, selectedMax, artistFilter.selected, stock]);

  // fetch more vinyls, SHOW MORE button
  useEffect (() => {
    async function fetchMoreVinyl () {
      try {
        let url = 'http://localhost:4000/vinyls';
        const conditions = [];

        if (sale) conditions.push(`sale=${true}`);
        if (genre.length) conditions.push(genre.map(g => `genre=${g}`).join('&'));
        if (artistFilter.selected.length) {
          conditions.push(artistFilter.selected.map(a => `artist=${a}`).join('&'))
        };

        conditions.push(`min-price=${selectedMin}&max-price=${selectedMax}`)

        if (showMore.offsetValue > 0) conditions.push(`offset=${showMore.offsetValue}`)

        if (conditions.length > 0) url += "?" + conditions.join('&');

        const response = await axios.get(url);
        const more_vinyls = response.data.all_vinyls

        const total_count = Number(response.data.total_count[0].total_count);

        if (total_count <= showMore.offsetValue+24) {
          setShowMore((prev) => ({
            ...prev,
            toShow: false
          }))
        } else {
          setShowMore((prev) => ({
            ...prev,
            toShow: true
          }))
        }

        // Adding if to prevent double inital fetch
        if (showMore.offsetValue>0) setVinyls((prev:Vinyl[]) => prev.concat(more_vinyls))
      } catch (error) {
        console.error('Error fetching more vinyls:', error);
      }
    }
    fetchMoreVinyl()
  }, [showMore.offsetValue])

  // Sets up the min and max price in the filter
  useEffect(() => {
    async function fetchMinMax () {
      try {
        let url = 'http://localhost:4000/vinyls';
        const conditions = [];

        if (sale) conditions.push(`sale=${true}`);
        if (genre.length) conditions.push(genre.map(g => `genre=${g}`).join('&'));
        if (artistFilter.selected.length) {
          conditions.push(artistFilter.selected.map(a => `artist=${a}`).join('&'))
        };

        if (conditions.length > 0) url += "?" + conditions.join('&');

        const response = await axios.get(url);
        const min_max = response.data.min_max[0];
        const min_price = min_max.min_price;
        const max_price = min_max.max_price;

        // set min/max
        setMin(Math.floor(min_price));
        setMax(Math.ceil(max_price));
        setSelectedMin(Math.floor(min_price));
        setSelectedMax(Math.ceil(max_price));

      } catch (error) {
        console.error('Error fetching filtered vinyls:', error);
      }
    }
    fetchMinMax()
  }, [genre, sale, artistFilter.selected]);

  // Fetches artist name when filter for certain artists
  useEffect(() => {
    async function fetchArtists() {
      try {
        let url = 'http://localhost:4000/artists';

        if (artistFilter.selecting) url += `?artist=${artistFilter.selecting}`

        const response = await axios.get(url);

        const artistNames = response.data;

        setArtistFilter(prev => ({...prev, selectingList: artistNames }))
      } catch (error) {
        console.error('Error fetching filtered vinyls:', error);
      }
    }

    fetchArtists();
  }, [artistFilter.selecting]);

  return (
    <div>
      <div className={styles.mainHeaders}>
        <div className={styles.mainTitle}>SHOP VINYL</div>
        <div className={styles.sorting}>
          <div>Sort by</div>
          <div className={styles.sortDropdown}>
            <div>
              <div
                className={`${styles.sortStyling} ${isOpenSort ? styles.active : ''}`}
                onClick={()=>toggleDropdown(setIsOpenSort)}
                >
                <div className={styles.sortHeader}>{selectedSort}</div>
                <Image
                  src={ArrowIcon}
                  width={15}
                  height={15}
                  alt="arrow icon"
                  className={`${isOpenSort ? styles.rotateIcon : styles.rotateIconReverse} ${genre.length && styles.contained}`}
                />
              </div>
            </div>
            <div className={`${styles.sortList} ${isOpenSort && styles.open}`}>
              {sorts.map((sort:Sorting, i:number)=> {
                return (
                  <div className={styles.checkboxWrapper} key={i}>
                  <input
                      type="radio"
                      name="option"
                      id={sort.variation}
                      value={JSON.stringify(sort)}
                      onChange={handleSortChange}
                    />
                    <label htmlFor={sort.variation}>{sort.variation}</label>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.mainLayout}>
        <div className={styles.filter}>
          <div className={styles.filterHeaders}>
            <span>Filter by</span>
            <span className={styles.resetAll}><button onClick={handleResetAll}>{showReset ? 'Reset all' : ''}</button></span>
          </div>
          <div
            className={`${styles.genreStyling} ${isOpenGenre ? styles.active : ''}`}
            onClick={()=>toggleDropdown(setIsOpenGenre)}
          >
            <legend className={`${genre.length && styles.contained_header}`}>
              Genre {genre.length ? `(${genre.length})`: ''}
            </legend>

            <Image
              src={ArrowIcon}
              width={15}
              height={15}
              alt="arrow icon"
              className={`${isOpenGenre ? styles.rotateIcon : styles.rotateIconReverse} ${genre.length && styles.contained_icon}`}
            />
          </div>
          <div className={`${styles.genreList} ${isOpenGenre && styles.open}`}>
            {genres.map((currentGenre: string, i: number) => {
              const genreVal: string = currentGenre.toLowerCase();
              return (
                <div className={styles.checkboxWrapper} key={i}>
                  <input
                    type="checkbox"
                    name={genreVal}
                    id={genreVal}
                    value={genreVal}
                    onChange={onCheckboxChange}
                  />
                  <label htmlFor={genreVal}>{currentGenre}</label>
                </div>
              );
            })}
          </div>
          <Artists
            toggleDropdown={toggleDropdown}
            isOpenArtist={isOpenArtist}
            setIsOpenArtist={setIsOpenArtist}
            ArrowIcon={ArrowIcon}
            genre={genre}
            artistFilter={artistFilter}
            setArtistFilter={setArtistFilter}
          />
          <div
            className={`${styles.priceStyling} ${isOpenPrice && styles.active}`}
            onClick={()=>toggleDropdown(setIsOpenPrice)}
          >
            <legend>
              Price
            </legend>
            <Image
              src={ArrowIcon}
              width={15}
              height={15}
              alt="arrow icon"
              className={`${isOpenPrice ? styles.rotateIcon : styles.rotateIconReverse} ${genre.length && styles.contained}`}
            />
          </div>
          <div className={`${styles.priceContainer}
            ${isOpenPrice && styles.open}
          `}
          // ${true && styles.open}
          >
            <DualRangeSlider
              setSelectedMin={setSelectedMin}
              setSelectedMax={setSelectedMax}
              selectedMin={selectedMin}
              selectedMax={selectedMax}
              MIN={min}
              MAX={max}
            />
          </div>
          <div className={styles.stock}>
            <div>
              Show only in stock
            </div>
            <label className={`${styles.toggle} ${stock ? styles.checked : ''}`}>
              <input
                type="checkbox"
                checked={stock}
                onChange={handleCheckboxStock}
              />
              <span className={styles.slider}></span>
            </label>
          </div>
          <div className={styles.stock}>
            <div>
              Show only on sale
            </div>
            <label className={`${styles.toggle} ${sale ? styles.checked : ''}`}>
              <input
                type="checkbox"
                checked={sale}
                onChange={handleCheckboxSale}
              />
              <span className={styles.slider}></span>
            </label>
          </div>
          <div className={styles.forChecking}
            onClick={handleCheckCurrent}
          >
            Check current: [{checkCurrent.toUpperCase()}]
          </div>
        </div>
        <div className={styles.products}>
          {vinyls.length === 0 ? (
            <p>No vinyls available.</p>
          ) : (
            <div className={styles.vinylContainer}>
              {vinyls.map((vinyl) => (
                <div key={vinyl.product_id} className={styles.vinyl}>
                  <div className={styles.imageWrapper}>
                    <div className={styles.wishlist}>
                      <Image
                        src={WishlistIcon}
                        alt='test'
                        width={25}
                        height={25}
                        className={styles.iconImage}
                      />
                    </div>
                    <Image
                      src={vinyl.vinyl_img}
                      width={267}
                      height={267}
                      alt={`${vinyl.vinyl_title} by ${vinyl.vinyl_artist}`}
                      className={styles.image}
                    />
                    <div className={styles.toCart}>
                      ADD TO CART
                    </div>
                    {
                      vinyl.sale_label &&
                      <span className={styles.sale}>
                        <span className={styles.saleLabel}>&#x2022; </span>
                        {vinyl.sale_label}
                      </span>
                    }
                    {
                      vinyl.low_stock_label &&
                      <span className={styles.lowStock}>
                        <span className={styles.lowStockLabel}>&#x2022; </span>
                        {vinyl.low_stock_label}
                      </span>
                    }
                  </div>
                  {/* THIS IS FOR ME TO INDICATE FILTER WORKING */}
                  <p><strong>[{vinyl.product_id}] {vinyl.genre.toUpperCase()}</strong></p>
                  <p className={styles.title} ><span><strong>{vinyl.vinyl_title}</strong></span></p>
                  <p>{vinyl.vinyl_artist}</p>
                  <div className={styles.priceContainer}>
                    <div>
                      {vinyl.old_price &&
                        <span className={styles.oldPrice}><s>${vinyl.old_price}</s></span>
                      }
                      <span className={styles.price}>{" "}${vinyl.price}</span>
                    </div>
                    <span className={styles.vinylLabel}>VINYL</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          {showMore.toShow &&
            <div className={styles.showMoreContainer}>
              <div className={styles.showMore} onClick={handleShowMore}>
                  Show More
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  );
}