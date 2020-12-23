import { ICreateGalaxyDTO } from '../dtos/ICreateGalaxyDTO';
import { Galaxy } from '../infra/typeorm/entities/Galaxy';

export interface IGalaxyRepository {
  findAll(): Promise<Galaxy[]>;

  findByName(name: string): Promise<Galaxy | undefined>;

  create(data: ICreateGalaxyDTO): Promise<Galaxy>;
}
