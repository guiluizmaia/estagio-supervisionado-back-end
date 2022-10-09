import { inject, injectable } from "tsyringe";
import { FormPayment } from "../infra/typeorm/entities/FormPayment";
import IFormPaymentRepository from "../repositories/IFormPaymentRepository";

interface IRequest {
    formPayment: string
}

@injectable()
class CreateFormPaymentService {
    constructor(
        @inject('FormPaymentRepository')
        private formPaymentRepository: IFormPaymentRepository
    ){}

    public async execute({formPayment}: IRequest): Promise<FormPayment>{
        
        return this.formPaymentRepository.create({formPayment});
    }

}

export default CreateFormPaymentService