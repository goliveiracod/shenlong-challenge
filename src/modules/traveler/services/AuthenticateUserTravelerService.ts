import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { auth } from '@config/auth';

import { AppError } from '@shared/errors/AppError';

import { Traveler } from '../infra/typeorm/entities/Traveler';
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';
import { ITravelerRepository } from '../repositories/ITravelerRepository';

interface IRequestDTO {
  email: string;
  password: string;
}

export interface IResponseDTO {
  userTraveler: Traveler;
  token: string;
}

@injectable()
export class AuthenticateUserTravelerService {
  constructor(
    @inject('TravelerRepository')
    private travelerRepository: ITravelerRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    email,
    password,
  }: IRequestDTO): Promise<IResponseDTO> {
    const userTraveler = await this.travelerRepository.findByEmail(email);

    if (!userTraveler) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      userTraveler.password,
    );

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const { jwt } = auth;

    const { privateKey, expiresIn } = jwt;

    const token = sign({}, privateKey, {
      subject: userTraveler.id,
      expiresIn,
      algorithm: 'RS256',
    });

    return {
      userTraveler,
      token,
    };
  }
}
