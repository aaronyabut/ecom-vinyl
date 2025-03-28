import { Request, Response} from 'express';
import  { getAllVinylsModel, getArtistsModel } from '../models/models';

export const getAllVinylsController = async (req: Request, res: Response) => {
  try {
    // if values are present, assign variables to the value else assign to undefined
    const genre = typeof req.query.genre === 'string' || typeof req.query.genre === 'object' ? req.query.genre : undefined;
    const sale = typeof req.query.sale === 'string' ? req.query.sale : undefined;
    const selectedMin = typeof req.query['min-price'] === 'string' ? req.query['min-price'] : undefined;
    const selectedMax = typeof req.query['max-price'] === 'string' ? req.query['max-price'] : undefined;
    const artist = typeof req.query.artist === 'string' || typeof req.query.artist === 'object' ? req.query.artist : undefined;

    const vinyls = await getAllVinylsModel(genre,sale,selectedMin,selectedMax,artist);

    res.json(vinyls);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
    console.log(error);
  }
};

export const getArtistsController = async (req: Request, res: Response) => {
  try {
    const artist = typeof req.query.artist === 'string' ? req.query.artist : undefined;
    const artistList = await getArtistsModel(artist);

    res.json(artistList);
  } catch (error) {
    res.status(500).json({ error: `Internal server error: ${error}` });
    console.log(error);
  }
}

// export const test = async (req: Request, res: Response) => {
//   res.json({ message: 'Message from Express!' });
// };