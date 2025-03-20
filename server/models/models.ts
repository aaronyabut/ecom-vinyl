const pool = require('../../database/db');

module.exports = {
  getAllVinyls: async (genre?: string, sale?: boolean) => {
    try {
      let query = 'SELECT * FROM vinyls';
      const values: string[] = [];
      let conditions: string[] = [];
      let paramIndex = 1;

      // Filter by genre
      if (genre) {
        if (Array.isArray(genre)) {
          const placeholders = genre.map(() => `$${paramIndex++}`).join(', ');
          conditions.push(`genre IN (${placeholders})`);
          values.push(...genre);
        } else {
          conditions.push(`genre = $${paramIndex++}`);
          values.push(genre);
        }
      }

      // Filter by sale
      if (sale) {
        conditions.push('sale_label IS NOT NULL');
      }

      // Combine conditions with WHERE clause
      if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
      }

      // console.log("QUERY", query)
      // console.log("VALUES", values)
      const { rows } = await pool.query(query, values);
      return rows;
    } catch (error) {
      console.error('Error fetching vinyls:', error);
      throw new Error('Database error');
    }
  }
};