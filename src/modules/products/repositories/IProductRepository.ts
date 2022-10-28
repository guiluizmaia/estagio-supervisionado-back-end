import { Product } from '../infra/typeorm/entities/Product';
import { ProductHistoric, ProductsInput, ProductsInput_products } from '../infra/typeorm/entities/ProductHistoric';

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
    qntdAfter: number;
  }

  export interface ProductInputDtos {
    date: Date;
  }

  export interface ProductInput_ProductsDtos {
    productsInputId: string;
    productId: string;
    name: string;
    price?: number;
    qntd: number;
    type: "ADD" | "SUB";
  }

interface IProductRepository {
  findById(id: String): Promise<Product | undefined>;
  findByIds(ids: String[]): Promise<Product[]>;
  create(product: ProductDtos): Promise<Product>;
  createHistoric(historic: ProductHistoricDtos): Promise<ProductHistoric>;
  createProductInput(product: ProductInputDtos): Promise<ProductsInput>;
  updateProductInput(product: ProductsInput): Promise<ProductsInput>;
  findByIdProductInput(id: String): Promise<ProductsInput | undefined>;
  deleteProductInput(id: string): Promise<void>;
  createProductInput_Products(product: ProductInput_ProductsDtos): Promise<ProductsInput_products>;
  deleteProductInput_Products(id: String): Promise<void>;
  findByProductInputId(id: String): Promise<ProductsInput_products[]>;
  save(product: Product): Promise<Product>;
  index(skip?: number, take?: number): Promise<Product[]>;
  indexProductInput(skip?: number, take?: number): Promise<ProductsInput[]>;
  count(): Promise<number>;
  countProductInput(): Promise<number>;
  delete(id: string): Promise<void>;
  countSearch(name: string): Promise<number>
  search(name: string, skip?: number, take?: number): Promise<Product[]>;
}

export default IProductRepository;
