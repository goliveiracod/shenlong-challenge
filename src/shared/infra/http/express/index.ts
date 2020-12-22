import cors from 'cors';
import express, { Request, Response } from 'express';

import 'express-async-errors';
import { exceptionHandler } from './middleware/exceptionHandler';
import { routes } from './routes';

const app = express();

app.use(cors());

app.use(express.json());

app.get('/', (request: Request, response: Response) => {
  return response.send();
});

app.use(routes);

app.use(exceptionHandler);

export { app };
