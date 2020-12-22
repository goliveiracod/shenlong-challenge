import { compare, hash } from 'bcryptjs';

import { auth } from '@config/auth';

import { IHashProvider } from '../models/IHashProvider';

export class BCryptHashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return hash(payload, auth.hashSaltRounds);
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}
