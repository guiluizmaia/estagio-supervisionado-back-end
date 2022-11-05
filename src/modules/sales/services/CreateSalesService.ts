import IProductRepository from "../../../modules/products/repositories/IProductRepository";
import { inject, injectable } from "tsyringe";
import { Sales } from "../infra/typeorm/entities/Sales";
import ISalesRepository, { SaleDtos } from "../repositories/ISalesRepository";

interface IRequest {
    clientsId: string;
    usersId: string;
    formPaymentId: string;
    products: {
        id: string;
        qntd: number;
    } []
}

@injectable()
class CreateSalesService {
    constructor(
        @inject('SalesRepository')
        private salesRepository: ISalesRepository,
        @inject('ProductRepository')
        private productRepository: IProductRepository
    ){}

    public async execute({usersId,  clientsId, formPaymentId, products}: IRequest): Promise<Sales>{
        const ids: string[] = []
        let amount = 0

        products.forEach(product => {
            ids.push(product.id)
        })

        const productsFind = await this.productRepository.findByIds(ids);

        productsFind.forEach(productFind => {
            const productSale = products.find(product => product.id === productFind.id)
            if (productSale){
                if(productFind.qntd - productSale.qntd >= 0){
                    productFind.qntd -=  productSale.qntd
                    amount += productSale.qntd * productFind.salePrice;
                } else {
                    amount += productFind.qntd * productFind.salePrice;
                    productFind.qntd = 0
                }
            }
        })

        const sale = await this.salesRepository.create({usersId, amount, clientsId, formPaymentId});


        await Promise.all(
            productsFind.map(async productFind => {
                await this.productRepository.save(productFind)

                const productSale = products.find(product => product.id === productFind.id)
                await this.salesRepository.createSalesProducts({
                    productId: productFind.id,
                    saleId: sale.id,
                    qntd: productSale ? productSale.qntd : 0,
                    name: productFind.name,
                    price: productFind.salePrice,
                    paidPriceForItem: productFind.paidPrice,
                    providerId: productFind.providerId,
                    providerName: productFind.provider.name
                })
            })
        )

        return sale
    }

}

export default CreateSalesService