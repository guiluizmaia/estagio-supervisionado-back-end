import { inject, injectable } from "tsyringe";
import { Sales } from "../infra/typeorm/entities/Sales";
import ISalesRepository from "../repositories/ISalesRepository";

interface IRequest {
    id: string
    by: string
}

@injectable()
class FindSalesService {
    constructor(
        @inject('SalesRepository')
        private salesRepository: ISalesRepository
    ){}

    public async execute({id, by}: IRequest): Promise<Sales[]>{
        let sales: Sales[] = [];

        if(by === "clientId"){
            sales = await this.salesRepository.findByClientId(id);
        } else if (by === "paymentId"){
            sales = await this.salesRepository.findByPaymentId(id);
        } else if (by === "userId"){
            sales = await this.salesRepository.findByUserId(id);
        }

        return sales
    }

}

export default FindSalesService