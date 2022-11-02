import AppError from "../../../infra/http/errors/AppError";
import { inject, injectable } from "tsyringe";
import { Product } from "../infra/typeorm/entities/Product";
import IProductRepository from "../repositories/IProductRepository";

interface IRequest extends Product {}

@injectable()
class UpdateProductService {
    constructor(
        @inject('ProductRepository')
        private productRepository: IProductRepository,
      ) {}

    public async execute(data: IRequest): Promise<Product>{
        const product = await this.productRepository.findById(data.id);

        if (!product) throw new AppError("product not found", 404)

        Object.assign(product, data)

        return this.productRepository.save(product);
    }
}

export default UpdateProductService;
