import AppError from "src/infra/http/errors/AppError";
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
        const formPayment = await this.formPaymentRepository.findById(id);

        if (!formPayment) throw new AppError("Form Payment not found", 404)

        await this.formPaymentRepository.save({...formPayment, active: false})
    }

}

export default DeleteFormPaymentService