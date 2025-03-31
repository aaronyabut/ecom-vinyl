import express from 'express';
import { getAllVinylsController,getArtistsController } from './controllers/controllers';

const router = express.Router();

router.get('/vinyls', getAllVinylsController);
router.get('/artists', getArtistsController);

export default router;