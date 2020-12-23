import { container } from 'tsyringe';

import '../providers';

import '@modules/traveler/providers';

import { GalaxyRepository } from '@modules/galaxy/infra/typeorm/repositories/GalaxyRepository';
import { IGalaxyRepository } from '@modules/galaxy/repositories/IGalaxyRepository';
import { TravelerRepository } from '@modules/traveler/infra/typeorm/repositories/TravelerRepository';
import { ITravelerRepository } from '@modules/traveler/repositories/ITravelerRepository';

container.registerSingleton<ITravelerRepository>(
  'TravelerRepository',
  TravelerRepository,
);

container.registerSingleton<IGalaxyRepository>(
  'GalaxyRepository',
  GalaxyRepository,
);
