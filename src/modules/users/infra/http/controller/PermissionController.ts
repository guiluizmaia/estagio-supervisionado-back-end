import { Request, Response } from 'express';
import IndexPermissionsService from '../../../../../modules/users/services/IndexPermissionsService';
import { container } from 'tsyringe';

class PermissionController {
  public async index(request: Request, response: Response): Promise<Response> {
    const permissions = await container
      .resolve(IndexPermissionsService)
      .execute();

    return response.status(200).json(permissions);
  }
}

export default PermissionController;
