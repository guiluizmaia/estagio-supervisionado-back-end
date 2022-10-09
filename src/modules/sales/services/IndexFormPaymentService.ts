import AppError from "src/infra/http/errors/AppError";
import INumeric from "src/infra/utils/Numerics/INumeric";
import { inject, injectable } from "tsyringe";
import { FormPayment } from "../infra/typeorm/entities/FormPayment";
import IFormPaymentRepository from "../repositories/IFormPaymentRepository";

interface IRequest {
    page: number;
    quant?: number;
}
  
interface IResponse {
  result: FormPayment[],
  page: number,
  lastPage: number
}

@injectable()
class IndexFormPaymentService {
    constructor(
        @inject('FormPaymentRepository')
        private formPaymentRepository: IFormPaymentRepository,
        @inject('Numeric')
        private numeric: INumeric,
    ){}

    public async execute({page, quant = 10}: IRequest): Promise<IResponse>{
        const count = await this.formPaymentRepository.count()
        let lastPage = count / quant
        
        if(this.numeric.isFloat(lastPage)) lastPage = parseInt(String(lastPage + 1))
    
        let pageFind = 0
        if (page !== 0) pageFind = page - 1
        const result = await this.formPaymentRepository.index(pageFind * quant, quant);
    
        return {
          result,
          lastPage,
          page
        }
    }

}

export default IndexFormPaymentService