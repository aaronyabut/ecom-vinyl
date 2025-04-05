import { pool } from '../../database/db';

export const getAllVinylsModel = async (
  genre?: string | object,
  sale?: string,
  selectedMin?:string,
  selectedMax?:string,
  artist?: string | object,
  offset?: string,
  sort?: string
) => {
  try {
    let query = 'SELECT * FROM vinyls';
    let min_max_query = 'SELECT MIN(price) AS min_price, MAX(price) AS max_price FROM vinyls'
    let total_count_query = 'SELECT COUNT(*) AS total_count  FROM vinyls'
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
    // Filter by artist
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

    // Combine conditions to find MIN and MAX price, before adding price range filter
    if (conditions.length > 0) min_max_query += ' WHERE ' + conditions.join(' AND ');
    const { rows: min_max} = await pool.query(min_max_query, values);

    //Filter by price range
    if (selectedMin && selectedMax) conditions.push(`price BETWEEN ${selectedMin} AND ${selectedMax}`);

    // Combine conditions to find the total vinyl count, needs all filter included
    if (conditions.length > 0) total_count_query += ' WHERE ' + conditions.join(' AND ');
    const { rows: total_count} = await pool.query(total_count_query, values);

    // Combine conditions with WHERE clause
    if (conditions.length > 0) query += ' WHERE ' + conditions.join(' AND ');

    // Add Sort
    if (sort) query += ` ORDER BY ${sort}`;

    // Add LIMIT to query
    query += ` LIMIT ${vinylAmount}`;

    // Adds another 24 vinyls, and is offsetted by the num inputted
    if (offset) query += ` OFFSET ${offset}`;
    const { rows: all_vinyls } = await pool.query(query, values);

    // console.log("[QUERY] ", query)
    // console.log("[VALUES] ", values)

    return {
      min_max: min_max,
      total_count: total_count,
      all_vinyls: all_vinyls
    };
  } catch (error) {
    console.error('Error fetching vinyls:', error);
    throw new Error('Database error');
  }
};

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