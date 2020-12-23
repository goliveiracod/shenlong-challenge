import { Request, Response } from 'express';

export class MeetingController {
  public async create(request: Request, response: Response): Promise<Response> {
    return response.send();
  }
}
