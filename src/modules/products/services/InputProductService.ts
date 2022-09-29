import AppError from "src/infra/http/errors/AppError";
import { inject, injectable } from "tsyringe";
import { Product } from "../infra/typeorm/entities/Product";
import IProductRepository from "../repositories/IProductRepository";

interface IRequest {
    id: string;
    qntd: number;
    paidPrice: number;
}

@injectable()
class InputProductService {
    constructor(
        @inject('ProductRepository')
        private productRepository: IProductRepository,
      ) {}

    public async execute({id, qntd, paidPrice}: IRequest): Promise<Product>{
        const product = await this.productRepository.findById(id);

        if (!product) throw new AppError("product not found", 404)

        Object.assign(product, {id, paidPrice, qntd: qntd + product.qntd})

        await this.productRepository.createHistoric({
            type: "INPUT",
            qntd: qntd,
            qntdAfter: product.qntd,
            paidPrice: product.paidPrice,
            productId: product.id
        })

        return this.productRepository.save(product);
    }
}

export default InputProductService;
