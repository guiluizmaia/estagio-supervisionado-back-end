
import { FormPaymentRepository } from '../../../modules/sales/infra/typeorm/repositories/FormPaymentRepository';
import { SalesRepository } from '../../../modules/sales/infra/typeorm/repositories/SalesRepository';
import IFormPaymentRepository from '../../../modules/sales/repositories/IFormPaymentRepository';
import ISalesRepository from '../../../modules/sales/repositories/ISalesRepository';
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
