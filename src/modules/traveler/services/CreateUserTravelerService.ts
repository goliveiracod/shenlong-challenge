import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { auth } from '@config/auth';

import { AppError } from '@shared/errors/AppError';
import { IUUIdProvider } from '@shared/providers/UUIdProvider/models/IUUIdProvider';

import { Traveler } from '../infra/typeorm/entities/Traveler';
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';
import { ITravelerRepository } from '../repositories/ITravelerRepository';

interface IRequestDTO {
  nickname: string;
  email: string;
  password: string;
  planet_id?: string;
  avatar?: string;
}

interface IResponseDTO {
  userTraveler: Traveler;
  token: string;
}

@injectable()
export class CreateUserTravelerService {
  constructor(
    @inject('TravelerRepository')
    private travelerRepository: ITravelerRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('UUIdV4Provider')
    private uUIdV4Provider: IUUIdProvider,
  ) {}

  public async execute({
    email,
    nickname,
    password,
    avatar,
    planet_id,
  }: IRequestDTO): Promise<IResponseDTO> {
    const checkUserExists = await this.travelerRepository.findByEmail(email);

    if (checkUserExists) throw new AppError('Email address already used.');

    const hashedPassword = await this.hashProvider.generateHash(password);

    const id = await this.uUIdV4Provider.generate();

    const userTraveler = await this.travelerRepository.create({
      id,
      email,
      nickname,
      password: hashedPassword,
      avatar,
      planet_id,
    });

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
