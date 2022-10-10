import AppError from "src/infra/http/errors/AppError";
import { inject, injectable } from "tsyringe";
import { Sales } from "../infra/typeorm/entities/Sales";
import ISalesRepository from "../repositories/ISalesRepository";

interface IRequest {
    id: string
}

@injectable()
class FindByIdSalesService {
    constructor(
        @inject('SalesRepository')
        private salesRepository: ISalesRepository
    ){}

    public async execute({id}: IRequest): Promise<Sales | undefined>{
        const sale = await this.salesRepository.findById(id);

        if (!sale) throw new AppError("Form Payment not found", 404)

        return sale
    }

}

export default FindByIdSalesService