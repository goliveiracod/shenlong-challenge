import { Router } from 'express';

import { ensureAuthenticated } from '@modules/traveler/infra/http/express/middleware/ensureAuthenticated';

import { GalaxyController } from '../controller/GalaxyController';

const galaxyRouter = Router();
const galaxyController = new GalaxyController();

galaxyRouter.use(ensureAuthenticated);

galaxyRouter.get('/', galaxyController.index);

export { galaxyRouter };
