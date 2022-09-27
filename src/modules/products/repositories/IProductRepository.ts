import { Product } from '../infra/typeorm/entities/Product';
import { ProductHistoric } from '../infra/typeorm/entities/ProductHistoric';

export interface ProductDtos {
  userId: string;
  providerId: string;
  name: string;
  description: string;
  paidPrice: number;
  salePrice: number;
  qntd: number;
}
export interface ProductHistoricDtos {
    productId: string;
    type: string;
    paidPrice: number;
    qntd: number;
  }

interface IProductRepository {
  findById(id: String): Promise<Product | undefined>;
  create(product: ProductDtos): Promise<Product>;
  createHistoric(historic: ProductHistoricDtos): Promise<ProductHistoric>;
  save(product: Product): Promise<Product>;
  index(skip?: number, take?: number): Promise<Product[]>;
  count(): Promise<number>;
  delete(id: string): Promise<void>;
  countSearch(name: string): Promise<number>
  search(name: string, skip?: number, take?: number): Promise<Product[]>;
}

export default IProductRepository;
