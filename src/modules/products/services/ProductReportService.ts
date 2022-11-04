import AppError from "../../../infra/http/errors/AppError";
import IProviderRepository from "../../providers/repositories/IProviderRepository";
import IUserRepository from "../../users/repositories/IUserRepository";
import { inject, injectable } from "tsyringe";
import { Product } from "../infra/typeorm/entities/Product";
import IProductRepository, { ProductDtos } from "../repositories/IProductRepository";
import ISalesRepository from "src/modules/sales/repositories/ISalesRepository";

interface IRequest {
    startDate: Date;
    finalDate: Date;
}

@injectable()
class ProductReportService {
    constructor(
        @inject('ProductRepository')
        private productRepository: IProductRepository,
        @inject('ProviderRepository')
        private providerRepository: IProviderRepository,
        @inject('SalesRepository')
        private salesRepository: ISalesRepository,
      ) {}

    public async execute({startDate, finalDate}: IRequest): Promise<any>{
        const sales = await this.salesRepository.findInDate(startDate, finalDate)
        let products: any[] = [];

        await Promise.all(
            sales.map(async sale => {
                const productsSales = await this.salesRepository.FindBySaleIdSalesProducts(sale.id);
                products = [...productsSales, ...products]
            })
        )

        const ret: any[] = []

        products.forEach(async product => {
            const retur = ret.find(ret => ret.productId === product.productId);
            const returnIndex = ret.findIndex(ret => ret.productId === product.productId);

            if(!retur){
                ret.push({
                    productId: product.productId,
                    name: product.name,
                    qntdSale: product.qntd,
                })          
            }else {
                ret[returnIndex] = {...ret[returnIndex], qntdSale: ret[returnIndex].qntdSale + product.qntd}
            }
        })

        await Promise.all(
            ret.map(async (retMap, index) => {
                const productFind = await this.productRepository.findById(retMap.productId);
                
                if (productFind)
                    ret[index] = {...retMap, description: productFind.description, providerName: productFind.provider.name, providerCnpj: productFind.provider.cnpj}
            })
        )


        return ret;
    }
}

export default ProductReportService;
