import { inject, injectable } from 'tsyringe';
import IPermissionsRepository from '../repositories/IPermissionsRepository';
import { Permission } from '../infra/typeorm/entities/Permission';

@injectable()
class IndexPermissionsService {
  constructor(
    @inject('PermissionsRepository')
    private permissionsRepository: IPermissionsRepository,
  ) {}

  public async execute(): Promise<Permission[]> {
    return this.permissionsRepository.index();
  }
}

export default IndexPermissionsService;
