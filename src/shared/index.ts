import 'reflect-metadata';

import 'dotenv/config';

import '@shared/infra/typeorm';

import './container';

import { app } from '@shared/infra/http/express';

app.listen(3333, () => {
  console.log('Server started on port 3333');
});
