import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListGalaxyWithPlanetAndUserTravelerService } from '@modules/galaxy/services/ListGalaxyWithPlanetAndUserTravelerService';

export class GalaxyController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listGalaxy = container.resolve(
      ListGalaxyWithPlanetAndUserTravelerService,
    );

    const galaxies = await listGalaxy.execute();

    return response.json(galaxies);
  }
}
