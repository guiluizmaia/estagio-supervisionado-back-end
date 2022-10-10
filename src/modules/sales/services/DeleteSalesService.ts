import { inject, injectable } from "tsyringe";
import ISalesRepository from "../repositories/ISalesRepository";

interface IRequest {
    id: string
}

@injectable()
class DeleteSalesService {
    constructor(
        @inject('SalesRepository')
        private salesRepository: ISalesRepository
    ){}

    public async execute({id}: IRequest): Promise<void>{
        await this.salesRepository.delete(id);
    }

}

export default DeleteSalesService