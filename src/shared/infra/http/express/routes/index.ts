import { Router } from 'express';

import { galaxyRouter } from '@modules/galaxy/infra/http/express/routes/galaxy.routes';
import { sessionRouter } from '@modules/traveler/infra/http/express/routes/sessions.routes';
import { travelerRouter } from '@modules/traveler/infra/http/express/routes/traveler.routes';

const routes = Router();

routes.use('/auth', sessionRouter);
routes.use('/traveler', travelerRouter);
routes.use('/galaxy', galaxyRouter);

export { routes };
