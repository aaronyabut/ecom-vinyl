const pool = require('../../database/db');

module.exports = {
  getAllVinyls: async (genre?: string) => {
    try {
      let query = 'SELECT * FROM vinyls';
      const values:string[] = [];
      // This filters by genre
      if (genre) {
        // If there are multiple genres
        if(Array.isArray(genre)) {
          const placeholders = genre.map((_, i) => `$${i + 1}`).join(', ');
          query += ` WHERE genre IN (${placeholders})`;
          values.push(...genre);
        } else {
          query += ' WHERE genre = $1';
          values.push(genre);
        }
      }
      console.log("QUERY", query)
      console.log("VALUES", values)
      const { rows } = await pool.query(query, values);
      return rows;
    } catch (error) {
      console.error('Error fetching vinyls:', error);
      throw new Error('Database error');
    }
  }
};