import AppError from "../../../infra/http/errors/AppError";
import { inject, injectable } from "tsyringe";
import { FormPayment } from "../infra/typeorm/entities/FormPayment";
import IFormPaymentRepository from "../repositories/IFormPaymentRepository";

interface IRequest {
    id: string
}

@injectable()
class FindByIdFormPaymentService {
    constructor(
        @inject('FormPaymentRepository')
        private formPaymentRepository: IFormPaymentRepository
    ){}

    public async execute({id}: IRequest): Promise<FormPayment | undefined>{
        const formPayment = await this.formPaymentRepository.findById(id);

        if (!formPayment) throw new AppError("Form Payment not found", 404)

        return formPayment
    }

}

export default FindByIdFormPaymentService