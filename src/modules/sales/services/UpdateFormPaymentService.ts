import AppError from "src/infra/http/errors/AppError";
import { inject, injectable } from "tsyringe";
import { FormPayment } from "../infra/typeorm/entities/FormPayment";
import IFormPaymentRepository from "../repositories/IFormPaymentRepository";

@injectable()
class UpdateFormPaymentService {
    constructor(
        @inject('FormPaymentRepository')
        private formPaymentRepository: IFormPaymentRepository
    ){}

    public async execute(formPaymentNew: FormPayment): Promise<FormPayment>{
        const formPayment = await this.formPaymentRepository.findById(formPaymentNew.id);

        if (!formPayment) throw new AppError("Form Payment not found", 404)

        Object.assign(formPayment, formPaymentNew)

        return this.formPaymentRepository.save(formPayment);
    }

}

export default UpdateFormPaymentService