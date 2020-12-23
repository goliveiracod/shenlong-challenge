import { getRepository, Repository } from 'typeorm';

import { ICreateGalaxyDTO } from '@modules/galaxy/dtos/ICreateGalaxyDTO';
import { IGalaxyRepository } from '@modules/galaxy/repositories/IGalaxyRepository';

import { Galaxy } from '../entities/Galaxy';

export class GalaxyRepository implements IGalaxyRepository {
  private ormRepository: Repository<Galaxy>;

  constructor() {
    this.ormRepository = getRepository(Galaxy);
  }

  public async findAll(): Promise<Galaxy[]> {
    const galaxies = await this.ormRepository.find({
      relations: ['planets', 'planets.travelers'],
    });

    return galaxies;
  }

  public async create(galaxyData: ICreateGalaxyDTO): Promise<Galaxy> {
    const galaxy = this.ormRepository.create(galaxyData);

    await this.ormRepository.save(galaxy);

    return galaxy;
  }

  public async findByName(name: string): Promise<Galaxy | undefined> {
    const galaxy = await this.ormRepository.findOne({
      where: { name },
    });

    return galaxy;
  }
}
