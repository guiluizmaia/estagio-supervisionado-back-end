import { inject, injectable } from "tsyringe";
import { Product } from "../infra/typeorm/entities/Product";
import IProductRepository from "../repositories/IProductRepository";

@injectable()
class IndexAllProductService {
    constructor(
        @inject('ProductRepository')
        private productRepository: IProductRepository,
      ) {}

    public async execute(): Promise<Product[]>{
      return this.productRepository.indexAll();
    }
}

export default IndexAllProductService;
