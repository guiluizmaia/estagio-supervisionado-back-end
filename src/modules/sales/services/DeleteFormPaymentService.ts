import { inject, injectable } from "tsyringe";
import IFormPaymentRepository from "../repositories/IFormPaymentRepository";

interface IRequest {
    id: string
}

@injectable()
class DeleteFormPaymentService {
    constructor(
        @inject('FormPaymentRepository')
        private formPaymentRepository: IFormPaymentRepository
    ){}

    public async execute({id}: IRequest): Promise<void>{
        await this.formPaymentRepository.delete(id);
    }

}

export default DeleteFormPaymentService