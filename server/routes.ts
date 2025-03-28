import express from 'express';
import { getAllVinylsController,getArtistsController, test } from './controllers/controllers';

const router = express.Router();

router.get('/vinyls', getAllVinylsController);
router.get('/artists', getArtistsController);
router.get('/test', test);

export default router;