import express from 'express';
import { getAllVinylsController,getArtistsController } from './controllers/controllers';
  //, test

const router = express.Router();

router.get('/vinyls', getAllVinylsController);
router.get('/artists', getArtistsController);
// router.get('/test', test);

export default router;