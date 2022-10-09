
import { FormPaymentRepository } from 'src/modules/sales/infra/typeorm/repositories/FormPaymentRepository';
import IFormPaymentRepository from 'src/modules/sales/repositories/IFormPaymentRepository';
import { DependencyContainer } from 'tsyringe';

class SalesModules {
  static Configure(container: DependencyContainer): void {
    container
      .registerSingleton<IFormPaymentRepository>(
        'FormPaymentRepository',
        FormPaymentRepository,
      );
  }
}

export default SalesModules;
