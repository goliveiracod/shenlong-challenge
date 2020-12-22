import 'dotenv/config';

import { AppError } from '@shared/errors/AppError';

import { FakeHashProvider } from '../providers/HashProvider/fakes/FakeHashProvider';
import { FakeTravelerRepository } from '../repositories/fakes/FakeTravelerRepository';
import { AuthenticateUserTravelerService } from './AuthenticateUserTravelerService';

let fakeTravelerRepository: FakeTravelerRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUserTraveler: AuthenticateUserTravelerService;

describe('AuthenticateUserTraveler', () => {
  beforeEach(() => {
    fakeTravelerRepository = new FakeTravelerRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUserTraveler = new AuthenticateUserTravelerService(
      fakeTravelerRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate', async () => {
    const userTraveler = await fakeTravelerRepository.create({
      nickname: 'Nicolas Cage',
      email: 'nic@cage.com',
      password: '123456',
      id: '17fd8c3f-49d1-457c-b46a-c0080a5e51e5',
    });

    const authenticate = await authenticateUserTraveler.execute({
      email: 'nic@cage.com',
      password: '123456',
    });

    expect(authenticate.userTraveler).toEqual(userTraveler);
    expect(authenticate).toHaveProperty('token');
  });

  it('should not be able to authenticate with a email that does not exist', async () => {
    await expect(
      authenticateUserTraveler.execute({
        email: 'nic@cage.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with an incorrect email and password combination', async () => {
    await fakeTravelerRepository.create({
      nickname: 'Nicolas Cage',
      email: 'nic@cage.com',
      password: '123456',
      id: '17fd8c3f-49d1-457c-b46a-c0080a5e51e5',
    });

    await expect(
      authenticateUserTraveler.execute({
        email: 'nic@cage.com',
        password: 'nicIncorredPassword',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
