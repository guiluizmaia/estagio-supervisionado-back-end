import AppError from "src/infra/http/errors/AppError";
import IProductRepository from "src/modules/products/repositories/IProductRepository";
import { inject, injectable } from "tsyringe";
import { Sales } from "../infra/typeorm/entities/Sales";
import ISalesRepository from "../repositories/ISalesRepository";

@injectable()
class UpdateSalesService {
    constructor(
        @inject('SalesRepository')
        private salesRepository: ISalesRepository,
        @inject('ProductRepository')
        private productRepository: IProductRepository
    ){}

    public async execute(saleNew: Sales): Promise<Sales>{
        const sale = await this.salesRepository.findById(saleNew.id);

        if (!sale) throw new AppError("Sale not found", 404)

        Object.assign(sale, saleNew)

        if(sale.canceled){
            const products = await this.salesRepository.FindBySaleIdSalesProducts(sale.id);
            
            await Promise.all(products.map(async product => {
                const productOriginal = await this.productRepository.findById(product.productId)
                
                if (productOriginal) {
                    productOriginal.qntd += product.qntd
                    await this.productRepository.save(productOriginal);
                }
            }))
        }

        return this.salesRepository.save(sale);
    }

}

export default UpdateSalesService