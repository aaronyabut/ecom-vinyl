import { Request, Response} from 'express';
const vinylModel = require('../models/models');

module.exports = {
  getAllVinyls: async (req: Request, res: Response) => {
    try {
      const genre = req.query.genre;
      const vinyls = await vinylModel.getAllVinyls(genre);
      res.json(vinyls);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  test: async (req: Request, res: Response) => {
    res.json({ message: 'Message from Express!' });
  }
};