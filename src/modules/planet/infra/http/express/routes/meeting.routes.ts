import { Router } from 'express';

import { MeetingController } from '../controller/MeetingController';

const meetingRouter = Router();
const meetingController = new MeetingController();

meetingRouter.post('/:planet_id/join', meetingController.create);

export { meetingRouter };
