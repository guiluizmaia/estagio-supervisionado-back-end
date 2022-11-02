
import { ProviderRepository } from '../../../modules/providers/infra/typeorm/repositories/ProviderRepository';
import IProviderRepository from '../../../modules/providers/repositories/IProviderRepository';
import { DependencyContainer } from 'tsyringe';

class ProviderModules {
  static Configure(container: DependencyContainer): void {
    container
      .registerSingleton<IProviderRepository>(
        'ProviderRepository',
        ProviderRepository,
      );
  }
}

export default ProviderModules;
