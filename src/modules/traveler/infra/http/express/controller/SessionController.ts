import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AuthenticateUserTravelerService } from '@modules/traveler/services/AuthenticateUserTravelerService';

export class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUserTraveler = container.resolve(
      AuthenticateUserTravelerService,
    );

    const { userTraveler, token } = await authenticateUserTraveler.execute({
      email,
      password,
    });

    return response.json({
      user: userTraveler,
      token,
    });
  }
}
