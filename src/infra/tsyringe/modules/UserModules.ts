
import { PermissionsRepository } from '../../../modules/users/infra/typeorm/repositories/PermissionsRepository';
import { UserRepository } from '../../../modules/users/infra/typeorm/repositories/UserRepository';
import IPermissionsRepository from '../../../modules/users/repositories/IPermissionsRepository';
import IUserRepository from '../../../modules/users/repositories/IUserRepository';
import { DependencyContainer } from 'tsyringe';

class UserModules {
  static Configure(container: DependencyContainer): void {
    container
      .registerSingleton<IUserRepository>(
        'UserRepository',
        UserRepository,
      ).registerSingleton<IPermissionsRepository>('PermissionsRepository', PermissionsRepository);
  }
}

export default UserModules;
