import { container } from 'tsyringe';

import '../providers';

import '@modules/traveler/providers';

import { TravelerRepository } from '@modules/traveler/infra/typeorm/repositories/TravelerRepository';
import { ITravelerRepository } from '@modules/traveler/repositories/ITravelerRepository';

container.registerSingleton<ITravelerRepository>(
  'TravelerRepository',
  TravelerRepository,
);
