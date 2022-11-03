import { inject, injectable } from "tsyringe";
import { Product } from "../infra/typeorm/entities/Product";
import IProductRepository from "../repositories/IProductRepository";

interface IRequest {
    search: string;
  }

@injectable()
class IndexAndSearchAllProductService {
    constructor(
        @inject('ProductRepository')
        private productRepository: IProductRepository,
      ) {}

    public async execute({search}: IRequest): Promise<Product[]>{
      return this.productRepository.searchAll(search);
    }
}

export default IndexAndSearchAllProductService;
