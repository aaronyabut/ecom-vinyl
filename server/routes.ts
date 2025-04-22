import express from 'express';
import { getAllVinylsController,getArtistsController, getVinylByIdController } from './controllers/controllers';

const router = express.Router();

router.get('/vinyls', getAllVinylsController);
router.get('/artists', getArtistsController);
router.get('/vinyls/:product_id', getVinylByIdController);

export default router;