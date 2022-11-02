import AppError from "../../../infra/http/errors/AppError";
import { inject, injectable } from "tsyringe";
import { ProductsInput, ProductsInput_products } from "../infra/typeorm/entities/ProductHistoric";
import IProductRepository from "../repositories/IProductRepository";

interface IRequest {
    id: string
}

interface IResponse extends ProductsInput {
    products: ProductsInput_products[]
}

@injectable()
class FindByIdProductInputService {
    constructor(
        @inject('ProductRepository')
        private productRepository: IProductRepository,
      ) {}

    public async execute({id}: IRequest): Promise<IResponse>{
        const productInput = await this.productRepository.findByIdProductInput(id);

        if (!productInput) throw new AppError("ProductInput not found", 404)

        const products = await this.productRepository.findByProductInputId(productInput.id)

        return {...productInput, products}
    }
}

export default FindByIdProductInputService;
