import AppError from "src/infra/http/errors/AppError";
import { inject, injectable } from "tsyringe";
import { Sales } from "../infra/typeorm/entities/Sales";
import ISalesRepository from "../repositories/ISalesRepository";

@injectable()
class UpdateSalesService {
    constructor(
        @inject('SalesRepository')
        private salesRepository: ISalesRepository
    ){}

    public async execute(saleNew: Sales): Promise<Sales>{
        const sale = await this.salesRepository.findById(saleNew.id);

        if (!sale) throw new AppError("Sale not found", 404)

        Object.assign(sale, saleNew)

        return this.salesRepository.save(sale);
    }

}

export default UpdateSalesService