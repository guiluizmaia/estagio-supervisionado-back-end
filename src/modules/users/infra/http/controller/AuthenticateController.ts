import AuthenticateService from '../../../services/AuthenticateService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class AuthenticateController {
  public async login(request: Request, response: Response): Promise<Response> {
    const { password, email } = request.body;

    const auth = await container
      .resolve(AuthenticateService)
      .execute({ email, password });

    return response.status(200).json(auth);
  }
}

export default AuthenticateController;
