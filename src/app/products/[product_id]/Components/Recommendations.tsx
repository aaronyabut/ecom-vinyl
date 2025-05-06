import styles from '../page.module.scss'

const recommendationsHeader = "YOU'LL DIG THESE...";

export default function Recommendations () {
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
          Vinyls
        </div>
      </div>
    </section>
  )
}