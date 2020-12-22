import { Router } from 'express';

import { TravelerController } from '../controller/TravelerController';

const travelerRouter = Router();
const travelerController = new TravelerController();

travelerRouter.post('/create', travelerController.create);

export { travelerRouter };
