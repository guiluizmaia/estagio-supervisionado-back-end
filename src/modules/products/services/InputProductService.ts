import { inject, injectable } from "tsyringe";
import { ProductsInput, ProductsInput_products } from "../infra/typeorm/entities/ProductHistoric";
import IProductRepository from "../repositories/IProductRepository";

interface IRequest {
    date: Date;
    products: {
        productId: string;
        name: string;
        price?: number;
        type: "ADD" | "SUB";
        qntd: number;
    }[]
}

interface IResponse extends ProductsInput {
    products: ProductsInput_products[]
}
@injectable()
class InputProductService {
    constructor(
        @inject('ProductRepository')
        private productRepository: IProductRepository,
      ) {}

    public async execute({date, products}: IRequest): Promise<IResponse>{
        const productInput = await this.productRepository.createProductInput({date});
        await Promise.all(
        products.map(async product => {
            const productFind = await this.productRepository.findById(product.productId);
            if(productFind){
                await this.productRepository.createProductInput_Products({
                    name: productFind.name,
                    productId: product.productId,
                    productsInputId: productInput.id,
                    qntd: product.qntd,
                    type: product.type,
                    price: product.price
                })
                if (product.type === "ADD"){
                    const price = product.price ? product.price : productFind.paidPrice
                    Object.assign(productFind, {paidPrice: price, qntd: productFind.qntd + product.qntd})
                    await this.productRepository.save(productFind);
                } else if (product.type === "SUB"){
                    Object.assign(productFind, {qntd: productFind.qntd - product.qntd})
                    await this.productRepository.save(productFind);
                }
            }
        })
        )
        const productsInputRelational = await this.productRepository.findByProductInputId(productInput.id)

        return {
            ...productInput,
            products: productsInputRelational
        }
    }
}

export default InputProductService;
