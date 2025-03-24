import express from 'express';
import { getAllVinylsController, test } from './controllers/controllers';

const router = express.Router();

router.get('/vinyls', getAllVinylsController);
router.get('/test', test);

export default router;