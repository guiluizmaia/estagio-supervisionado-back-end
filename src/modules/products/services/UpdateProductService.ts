import AppError from "src/infra/http/errors/AppError";
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

        if(data.qntd && data.qntd > product.qntd) await this.productRepository.createHistoric({
            type: "ADD",
            qntd: data.qntd,
            paidPrice: data.paidPrice,
            productId: data.id

        })

        return this.productRepository.save(product);
    }
}

export default UpdateProductService;
