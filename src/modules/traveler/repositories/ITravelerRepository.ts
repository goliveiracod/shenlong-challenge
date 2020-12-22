import { ICreateUserTravelerDTO } from '../dtos/ICreateUserTravelerDTO';
import { Traveler } from '../infra/typeorm/entities/Traveler';

export interface ITravelerRepository {
  findAll(): Promise<Traveler[]>;

  findByEmail(email: string): Promise<Traveler | undefined>;

  create(data: ICreateUserTravelerDTO): Promise<Traveler>;

  save(traveler: Traveler): Promise<Traveler>;
}
