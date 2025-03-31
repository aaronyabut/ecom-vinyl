import { pool } from '../../database/db';

export const getAllVinylsModel = async (
  genre?: string | object,
  sale?: string,
  selectedMin?:string,
  selectedMax?:string,
  artist?: string | object,
  offset?: string
) => {
  try {
    let query = 'SELECT * FROM vinyls';
    let min_max_query = 'SELECT MIN(price) AS min_price, MAX(price) AS max_price FROM vinyls'
    let total_count_query = 'SELECT COUNT(*)  FROM vinyls'
    const values: string[] = [];
    const conditions: string[] = [];
    let paramIndex = 1;
    let vinylAmount = 24;
    // let vinylAmount = 180;

    // Filter by genre
    if (genre) {
      if (Array.isArray(genre)) {
        const placeholders = genre.map(() => `$${paramIndex++}`).join(', ');
        conditions.push(`genre IN (${placeholders})`);
        values.push(...genre);

      } else if (typeof genre === 'string') {
        conditions.push(`genre = $${paramIndex++}`);
        values.push(genre);
      }
    };

    // Filter by genre
    if (artist) {
      if (Array.isArray(artist)) {
        const placeholders = artist.map(() => `$${paramIndex++}`).join(', ');
        conditions.push(`vinyl_artist IN (${placeholders})`);
        values.push(...artist);
      } else if (typeof artist === 'string') {
        conditions.push(`vinyl_artist = $${paramIndex++}`);
        values.push(artist);
      }
    };
    // Filter by sale
    if (sale) conditions.push('sale_label IS NOT NULL');

    if (conditions.length > 0) min_max_query += ' WHERE ' + conditions.join(' AND ');
    const { rows: min_max} = await pool.query(min_max_query, values);


    if (conditions.length > 0) total_count_query += ' WHERE ' + conditions.join(' AND ');
    const { rows: total_count} = await pool.query(total_count_query, values);
    // console.log("min_max::::", min_max)
    console.log("total_count_query", total_count)


    //Filter by price range
    if (selectedMin && selectedMax) conditions.push(`price BETWEEN ${selectedMin} AND ${selectedMax}`);

    // Combine conditions with WHERE clause
    if (conditions.length > 0) query += ' WHERE ' + conditions.join(' AND ');



    // Add LIMIT to query
    query += ` LIMIT ${vinylAmount}`;

    if (offset) query += ` OFFSET ${offset}`;
    // console.log("QUERY", query)
    // console.log("offset", offset)
    // console.log("VALUES", values)
    const { rows: all_vinyls } = await pool.query(query, values);

    // return rows;
    return {
      min_max: min_max,
      all_vinyls: all_vinyls
    };
  } catch (error) {
    console.error('Error fetching vinyls:', error);
    throw new Error('Database error');
  }
};

// export const getMinMaxModel = async () => {
//   try {
//     let query = 'SELECT MIN(price) AS min_price, MAX(price) AS max_price FROM vinyls;';

//     const {rows} = await pool.query(query);
//     return rows
//     // console.log(`new MIN MAX ${JSON.stringify(rows)}`);


//   } catch (error) {
//     console.error('Error fetching min-max:', error);
//     throw new Error('Database error');
//   }
// }

export const getArtistsModel = async (artist?:string) => {
  try {
    let query = artist ? `
      SELECT DISTINCT vinyl_artist
      FROM vinyls
      WHERE LOWER(vinyl_artist) LIKE LOWER($1)
        OR LOWER(vinyl_artist) LIKE '% ' || LOWER($1)
      ORDER BY vinyl_artist
      LIMIT 10
    ` : '';
    const values = artist ? [`${artist}%`] : ['%'];

    const { rows } = await pool.query(query, values);

    // console.log("QUERY", query)
    // console.log("VALUES", values)

    return rows.map(row => row.vinyl_artist);
  } catch (error) {
    console.error('Error fetching artists:', error);
    throw new Error('Database error');
  }
}