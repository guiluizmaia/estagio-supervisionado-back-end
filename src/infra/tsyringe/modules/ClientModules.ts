
import { ClientsRepository } from '../../../modules/clients/infra/typeorm/repositories/ClientsRepository';
import IClientsRepository from '../../../modules/clients/repositories/IClientsRepository';
import { PermissionsRepository } from '../../../modules/users/infra/typeorm/repositories/PermissionsRepository';
import { UserRepository } from '../../../modules/users/infra/typeorm/repositories/UserRepository';
import { DependencyContainer } from 'tsyringe';

class ClientModules {
  static Configure(container: DependencyContainer): void {
    container
      .registerSingleton<IClientsRepository>(
        'ClientsRepository',
        ClientsRepository,
      );
  }
}

export default ClientModules;
