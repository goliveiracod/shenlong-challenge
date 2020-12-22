import { getRepository, Repository } from 'typeorm';

import { ICreateUserTravelerDTO } from '@modules/traveler/dtos/ICreateUserTravelerDTO';
import { ITravelerRepository } from '@modules/traveler/repositories/ITravelerRepository';

import { Traveler } from '../entities/Traveler';

export class TravelerRepository implements ITravelerRepository {
  private ormRepository: Repository<Traveler>;

  constructor() {
    this.ormRepository = getRepository(Traveler);
  }

  public async findAll(): Promise<Traveler[]> {
    const traveler = await this.ormRepository.find();

    return traveler;
  }

  public async findByEmail(email: string): Promise<Traveler | undefined> {
    const traveler = await this.ormRepository.findOne({
      where: { email },
    });

    return traveler;
  }

  public async create(travelerData: ICreateUserTravelerDTO): Promise<Traveler> {
    const traveler = this.ormRepository.create(travelerData);

    await this.ormRepository.save(traveler);

    return traveler;
  }

  public async save(traveler: Traveler): Promise<Traveler> {
    this.ormRepository.save(traveler);
    return traveler;
  }
}
