import { ICreateUserTravelerDTO } from '@modules/traveler/dtos/ICreateUserTravelerDTO';
import { Traveler } from '@modules/traveler/infra/typeorm/entities/Traveler';

import { ITravelerRepository } from '../ITravelerRepository';

export class FakeTravelerRepository implements ITravelerRepository {
  private traveler: Traveler[] = [];

  public async findAll(): Promise<Traveler[]> {
    return this.traveler;
  }

  public async findByEmail(email: string): Promise<Traveler | undefined> {
    const traveler = this.traveler.find(element => element.email === email);

    return traveler;
  }

  public async create(travelerData: ICreateUserTravelerDTO): Promise<Traveler> {
    const traveler = new Traveler();

    const simulateUUIdV4 = Date.now.toString();

    Object.assign(traveler, { id: simulateUUIdV4 }, travelerData);

    this.traveler.push(traveler);

    return traveler;
  }

  public async save(traveler: Traveler): Promise<Traveler> {
    const findByIndex = this.traveler.findIndex(
      element => element.id === traveler.id,
    );

    Object.assign(this.traveler[findByIndex], traveler);

    return traveler;
  }
}
