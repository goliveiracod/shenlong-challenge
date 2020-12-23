import { FakeUUIdV4Provider } from '@shared/providers/UUIdProvider/fakes/FakeUUIdV4Provider';

import { FakeGalaxyRepository } from '../repositories/fakes/FakeGalaxyRepository';
import { ListGalaxyWithPlanetAndUserTravelerService } from './ListGalaxyWithPlanetAndUserTravelerService';

let fakeUUIdV4Provider: FakeUUIdV4Provider;
let fakeGalaxyRepository: FakeGalaxyRepository;

let listGalaxy: ListGalaxyWithPlanetAndUserTravelerService;

describe('ListGalaxyWithPlanetAndUserTravelerService', () => {
  beforeEach(() => {
    fakeUUIdV4Provider = new FakeUUIdV4Provider();
    fakeGalaxyRepository = new FakeGalaxyRepository();
    listGalaxy = new ListGalaxyWithPlanetAndUserTravelerService(
      fakeGalaxyRepository,
    );
  });

  it('should be able list all galaxies with planets and user traveler', async () => {
    const galaxy = await fakeGalaxyRepository.create({
      id: await fakeUUIdV4Provider.generate(),
      name: 'Zedron',
      order: 1,
    });

    const galaxy1 = await fakeGalaxyRepository.create({
      id: await fakeUUIdV4Provider.generate(),
      name: 'Hell',
      order: 2,
    });

    const galaxies = await listGalaxy.execute();

    expect(galaxies).toEqual([galaxy, galaxy1]);
  });
});
