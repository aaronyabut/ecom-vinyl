import express from 'express';
import { getAllVinylsController,getArtistsController,getMinMaxController } from './controllers/controllers';
  //, test

const router = express.Router();

router.get('/vinyls', getAllVinylsController);
router.get('/artists', getArtistsController);
router.get('/min_max', getMinMaxController);
// router.get('/test', test);

export default router;