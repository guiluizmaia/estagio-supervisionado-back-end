import AppError from "src/infra/http/errors/AppError";
import { inject, injectable } from "tsyringe";
import { ProductsSales } from "../infra/typeorm/entities/ProductsSales";
import { Sales } from "../infra/typeorm/entities/Sales";
import ISalesRepository from "../repositories/ISalesRepository";

interface IRequest {
    id: string
}

interface IResponse extends Sales {
    products: ProductsSales[]
}

@injectable()
class FindByIdSalesService {
    constructor(
        @inject('SalesRepository')
        private salesRepository: ISalesRepository
    ){}

    public async execute({id}: IRequest): Promise<IResponse>{
        const sale = await this.salesRepository.findById(id);

        if (!sale) throw new AppError("Form Payment not found", 404)

        const products = await this.salesRepository.FindBySaleIdSalesProducts(sale.id);
        
        return {...sale, products}
    }

}

export default FindByIdSalesService