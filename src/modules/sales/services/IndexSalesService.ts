import INumeric from "src/infra/utils/Numerics/INumeric";
import { inject, injectable } from "tsyringe";
import { Sales } from "../infra/typeorm/entities/Sales";
import ISalesRepository from "../repositories/ISalesRepository";

interface IRequest {
    page: number;
    quant?: number;
}
  
interface IResponse {
  result: Sales[],
  page: number,
  lastPage: number
}

@injectable()
class IndexSalesService {
    constructor(
        @inject('SalesRepository')
        private salesRepository: ISalesRepository,
        @inject('Numeric')
        private numeric: INumeric,
    ){}

    public async execute({page, quant = 10}: IRequest): Promise<IResponse>{
        const count = await this.salesRepository.count()
        let lastPage = count / quant
        
        if(this.numeric.isFloat(lastPage)) lastPage = parseInt(String(lastPage + 1))
    
        let pageFind = 0
        if (page !== 0) pageFind = page - 1
        const result = await this.salesRepository.index(pageFind * quant, quant);
    
        return {
          result,
          lastPage,
          page
        }
    }

}

export default IndexSalesService