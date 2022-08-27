
import { PermissionsRepository } from 'src/modules/users/infra/typeorm/repositories/PermissionsRepository';
import { UserRepository } from 'src/modules/users/infra/typeorm/repositories/UserRepository';
import IPermissionsRepository from 'src/modules/users/repositories/IPermissionsRepository';
import IUserRepository from 'src/modules/users/repositories/IUserRepository';
import { DependencyContainer } from 'tsyringe';

class ClientsModules {
  static Configure(container: DependencyContainer): void {
    container
      .registerSingleton<IUserRepository>(
        'UserRepository',
        UserRepository,
      ).registerSingleton<IPermissionsRepository>('PermissionsRepository', PermissionsRepository);
  }
}

export default ClientsModules;
