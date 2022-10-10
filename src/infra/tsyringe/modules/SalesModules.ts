
import { FormPaymentRepository } from 'src/modules/sales/infra/typeorm/repositories/FormPaymentRepository';
import { SalesRepository } from 'src/modules/sales/infra/typeorm/repositories/SalesRepository';
import IFormPaymentRepository from 'src/modules/sales/repositories/IFormPaymentRepository';
import ISalesRepository from 'src/modules/sales/repositories/ISalesRepository';
import { DependencyContainer } from 'tsyringe';

class SalesModules {
  static Configure(container: DependencyContainer): void {
    container
      .registerSingleton<IFormPaymentRepository>(
        'FormPaymentRepository',
        FormPaymentRepository,
      ).registerSingleton<ISalesRepository>(
        'SalesRepository',
        SalesRepository,
      );
  }
}

export default SalesModules;
