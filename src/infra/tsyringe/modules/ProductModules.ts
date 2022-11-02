
import { ProductRepository } from '../../../modules/products/infra/typeorm/repositories/ProductRepository';
import IProductRepository from '../../../modules/products/repositories/IProductRepository';
import { DependencyContainer } from 'tsyringe';

class ProductModules {
  static Configure(container: DependencyContainer): void {
    container
      .registerSingleton<IProductRepository>(
        'ProductRepository',
        ProductRepository,
      );
  }
}

export default ProductModules;
