import { Request, Response} from 'express';
import { getAllVinylsModel } from '../models/models';

export const getAllVinylsController = async (req: Request, res: Response) => {
  try {
    // if values are present, assign variables to the value else assign to undefined
    const genre = typeof req.query.genre === 'string' ? req.query.genre : undefined;
    const sale = typeof req.query.sale === 'boolean' ? req.query.sale : undefined;
    const selectedMin = typeof req.query["min-price"] === 'number' ? req.query["min-price"] : undefined;
    const selectedMax = typeof req.query["max-price"] === 'number' ? req.query["max-price"] : undefined;

    const vinyls = await getAllVinylsModel(genre,sale,selectedMin,selectedMax);

    // console.log(`CONTROLLER: ${req.query.genre}`)
    res.json(vinyls);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
    console.log(error);
  }
};

export const test = async (req: Request, res: Response) => {
  res.json({ message: 'Message from Express!' });
};