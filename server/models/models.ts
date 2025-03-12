const pool = require('../../database/db');

module.exports = {
  getAllVinyls: async (genre?: string) => {
    try {
      let query = 'SELECT * FROM vinyls';
      const values = [];
      if (genre) {
        query += ' WHERE genre = $1';
        values.push(genre);
      }
      const { rows } = await pool.query(query, values);
      return rows;
    } catch (error) {
      console.error('Error fetching vinyls:', error);
      throw new Error('Database error');
    }
  }
};