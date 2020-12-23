import { inject, injectable } from 'tsyringe';

import { Galaxy } from '../infra/typeorm/entities/Galaxy';
import { IGalaxyRepository } from '../repositories/IGalaxyRepository';

@injectable()
export class ListGalaxyWithPlanetAndUserTravelerService {
  constructor(
    @inject('GalaxyRepository')
    private galaxyRepository: IGalaxyRepository,
  ) {}

  public async execute(): Promise<Galaxy[]> {
    const galaxies = await this.galaxyRepository.findAll();

    return galaxies;
  }
}
