import { ICreateGalaxyDTO } from '@modules/galaxy/dtos/ICreateGalaxyDTO';
import { Galaxy } from '@modules/galaxy/infra/typeorm/entities/Galaxy';

import { IGalaxyRepository } from '../IGalaxyRepository';

export class FakeGalaxyRepository implements IGalaxyRepository {
  private galaxies: Galaxy[] = [];

  public async findAll(): Promise<Galaxy[]> {
    return this.galaxies;
  }

  public async findByName(name: string): Promise<Galaxy | undefined> {
    const galaxy = this.galaxies.find(element => element.name === name);

    return galaxy;
  }

  public async create(galaxyData: ICreateGalaxyDTO): Promise<Galaxy> {
    const galaxy = new Galaxy();

    Object.assign(galaxy, galaxyData);

    this.galaxies.push(galaxy);

    return galaxy;
  }
}
