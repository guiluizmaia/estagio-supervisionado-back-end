import AppError from "../../../infra/http/errors/AppError";
import INumeric from "../../../infra/utils/Numerics/INumeric";
import { inject, injectable } from "tsyringe";
import { Product } from "../infra/typeorm/entities/Product";
import IProductRepository from "../repositories/IProductRepository";

interface IRequest {
    page: number;
    quant?: number;
    search: string;
  }
  
  interface IResponse {
    result: Product[],
    page: number,
    lastPage: number
  }
@injectable()
class IndexAndSearchProductService {
    constructor(
        @inject('ProductRepository')
        private productRepository: IProductRepository,
        @inject('Numeric')
        private numeric: INumeric,
      ) {}

    public async execute({search, page, quant = 10}: IRequest): Promise<IResponse>{
        const count = await this.productRepository.countSearch(search)
        let lastPage = count / quant
        
        if(this.numeric.isFloat(lastPage)) lastPage = parseInt(String(lastPage + 1))
    
        let pageFind = 0
        if (page !== 0) pageFind = page - 1
        const result = await this.productRepository.search(search, pageFind * quant, quant);
    
        return {
          result,
          lastPage,
          page
        }
    }
}

export default IndexAndSearchProductService;
