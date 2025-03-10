const pool = require('../../database/db');

module.exports = {
  getAllVinyls: async () => {
    try {
      const { rows } = await pool.query('SELECT * FROM vinyls');
      return rows;
    } catch (error) {
      console.error('Error fetching vinyls:', error);
      throw new Error('Database error');
    }
  }
}
