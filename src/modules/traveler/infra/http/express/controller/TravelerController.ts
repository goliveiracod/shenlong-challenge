import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserTravelerService } from '@modules/traveler/services/CreateUserTravelerService';

export class TravelerController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, nickname, password, avatar, planet_id } = request.body;

    const createUserTraveler = container.resolve(CreateUserTravelerService);

    const { userTraveler, token } = await createUserTraveler.execute({
      email,
      nickname,
      password,
      avatar,
      planet_id,
    });

    return response.status(201).json({ user: userTraveler, token });
  }
}
