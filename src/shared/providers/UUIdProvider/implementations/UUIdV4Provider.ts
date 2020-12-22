import { v4 as uuid } from 'uuid';

import { IUUIdProvider } from '../models/IUUIdProvider';

export class UUIdV4Provider implements IUUIdProvider {
  async generate(): Promise<string> {
    return uuid();
  }
}
