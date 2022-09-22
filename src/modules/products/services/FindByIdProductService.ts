import AppError from "src/infra/http/errors/AppError";
import { inject, injectable } from "tsyringe";
import { Product } from "../infra/typeorm/entities/Product";
import IProductRepository from "../repositories/IProductRepository";

interface IRequest {
    id: string
}

@injectable()
class FindByIdProductService {
    constructor(
        @inject('ProductRepository')
        private productRepository: IProductRepository,
      ) {}

    public async execute(data: IRequest): Promise<Product>{
        const product = await this.productRepository.findById(data.id);

        if (!product) throw new AppError("product not found", 404)

        return product
    }
}

export default FindByIdProductService;
