import { Request, Response} from 'express';
const vinylModel = require('../models/models');

module.exports = {
  getAllVinyls: async (req: Request, res: Response) => {
    try {
      // retrieve the vinyl records from the database via the model
      const vinyls = await vinylModel.getAllVinyls();
      res.json(vinyls);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  test: async (req: Request, res: Response) => {
    try {
      res.json({ message: 'Message from Express!' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}