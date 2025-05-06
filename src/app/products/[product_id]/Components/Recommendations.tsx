import styles from '../page.module.scss'
import { Vinyl } from '../page'
const recommendationsHeader = "YOU'LL DIG THESE...";

// interface Vinyl {
//   product_id: number;
//   vinyl_img: string;
//   product_href: string;
//   vinyl_title: string;
//   vinyl_artist: string;
//   price: number;
//   old_price: number | null;
//   sale_label: string | null;
//   low_stock_label: string | null;
//   no_stock_label: string | null;
//   genre: string;
//   vinyl_description: string;
//   vinyl_info: string;
//   playlist_name: string;
//   tracklist: string;
//   companies: string;
//   main_artists: string;
//   songwriters: string;
// }

interface RecommendationsProps {
  recommendedVinyls: Vinyl[] | null;
}

export default function Recommendations ({ recommendedVinyls }: RecommendationsProps) {

  // console.log("AFTER",recommendedVinyls)

  return (
    <section className={styles.recommendations}>
      <div className={styles.container}>
        <div className={styles.headerWrapper}>
          <h2 className={styles.header}>
            {recommendationsHeader}
          </h2>
          <div className={styles.arrows}>
            <div>left arrow</div>
            <div>right arrow</div>
          </div>
        </div>
        <div className={styles.vinyls}>
          {recommendedVinyls?.map((vinyl, i) => (
            <div key={i}>
              {vinyl.vinyl_title}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}