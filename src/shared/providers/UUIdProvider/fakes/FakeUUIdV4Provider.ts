import { IUUIdProvider } from '../models/IUUIdProvider';

export class FakeUUIdV4Provider implements IUUIdProvider {
  async generate(): Promise<string> {
    const simulateUUIdV4 = Date.now().toString();
    return simulateUUIdV4;
  }
}
