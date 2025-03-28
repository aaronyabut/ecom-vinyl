import { pool } from '../../database/db';

export const getAllVinylsModel = async (genre?: string | object, sale?: string, selectedMin?:string, selectedMax?:string) => {
  try {
    let query = 'SELECT * FROM vinyls';
    const values: string[] = [];
    const conditions: string[] = [];
    let paramIndex = 1;

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
    }

    // Filter by sale
    if (sale) conditions.push('sale_label IS NOT NULL');
    if (selectedMin && selectedMax) conditions.push(`price BETWEEN ${selectedMin} AND ${selectedMax}`);

    // Combine conditions with WHERE clause
    if (conditions.length > 0) query += ' WHERE ' + conditions.join(' AND ');

    // console.log("QUERY", query)
    // console.log("VALUES", values)
    const { rows } = await pool.query(query, values);
    return rows;
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