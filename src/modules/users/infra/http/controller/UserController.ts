import AuthenticateService from '../../../services/AuthenticateService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from 'src/modules/users/services/CreateUserService';
import UpdateUserService from 'src/modules/users/services/UpdateUserService';
import IndexUsersService from 'src/modules/users/services/IndexUsersService';
import FindUserByEmailService from 'src/modules/users/services/FindUserByEmailService';
import DeleteUserEmailService from 'src/modules/users/services/DeleteUserEmailService';

class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { password, email, name, permissionId } = request.body;
    const { email: emailCreater } = request.user;

    const userCreated = await container
      .resolve(CreateUserService)
      .execute({ email, password, name, permissionId, emailCreater });

    return response.status(200).json(userCreated);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user = request.body;
    const { email: emailUpdater } = request.user;
    const { id } = request.query;

    const userUpdated = await container
      .resolve(UpdateUserService)
      .execute({ ...user, emailUpdater });

    return response.status(200).json(userUpdated);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { email } = request.user;
    let { page } = request.query;

    if(isNaN(Number(page))) page = '0'

    const users = await container
      .resolve(IndexUsersService)
      .execute({ email, page: Number(page) });

    return response.status(200).json(users);
  }

  public async find(request: Request, response: Response): Promise<Response> {
    const { email: emailParam } = request.query;
    const { email: emailToken } = request.user;

    const email = emailParam ? String(emailParam) : emailToken;

    const user = await container
      .resolve(FindUserByEmailService)
      .execute({ email });

    return response.status(200).json(user);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { email: emailToken } = request.user;

    await container
      .resolve(DeleteUserEmailService)
      .execute({ emailDeleter: emailToken, id });

    return response.status(200).json({ok: 'ok'});
  }
}

export default UserController;
