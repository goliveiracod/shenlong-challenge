import 'dotenv/config';

import { AppError } from '@shared/errors/AppError';
import { FakeUUIdV4Provider } from '@shared/providers/UUIdProvider/fakes/FakeUUIdV4Provider';

import { FakeHashProvider } from '../providers/HashProvider/fakes/FakeHashProvider';
import { FakeTravelerRepository } from '../repositories/fakes/FakeTravelerRepository';
import { CreateUserTravelerService } from './CreateUserTravelerService';

let fakeTravelerRepository: FakeTravelerRepository;
let fakeHashProvider: FakeHashProvider;
let fakeUUIdV4Provider: FakeUUIdV4Provider;

let createUserTraveler: CreateUserTravelerService;

describe('CreateUserTraveler', () => {
  beforeEach(() => {
    fakeTravelerRepository = new FakeTravelerRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeUUIdV4Provider = new FakeUUIdV4Provider();

    createUserTraveler = new CreateUserTravelerService(
      fakeTravelerRepository,
      fakeHashProvider,
      fakeUUIdV4Provider,
    );
  });

  it('should be able to create a new user', async () => {
    const { userTraveler } = await createUserTraveler.execute({
      nickname: 'Nicolas Cage',
      email: 'nic@cage.com',
      password: '123456',
    });

    expect(userTraveler).toHaveProperty('id');
  });

  it('should not be able to create a new user with an email that already exists', async () => {
    const userTraveler = {
      nickname: 'Nicolas Cage',
      email: 'nic@cage.com',
      password: '123456',
    };

    await createUserTraveler.execute(userTraveler);

    await expect(
      createUserTraveler.execute(userTraveler),
    ).rejects.toBeInstanceOf(AppError);
  });
});
