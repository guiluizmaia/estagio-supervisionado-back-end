
import { ClientsRepository } from 'src/modules/clients/infra/typeorm/repositories/ClientsRepository';
import IClientsRepository from 'src/modules/clients/repositories/IClientsRepository';
import { PermissionsRepository } from 'src/modules/users/infra/typeorm/repositories/PermissionsRepository';
import { UserRepository } from 'src/modules/users/infra/typeorm/repositories/UserRepository';
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
