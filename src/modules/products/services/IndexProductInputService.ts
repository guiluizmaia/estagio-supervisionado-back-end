import INumeric from "../../../infra/utils/Numerics/INumeric";
import { inject, injectable } from "tsyringe";
import { ProductsInput, ProductsInput_products } from "../infra/typeorm/entities/ProductHistoric";
import IProductRepository from "../repositories/IProductRepository";

interface IRequest {
    page: number;
    quant?: number;
    startDate: Date;
    endDate: Date;
  }
  
interface Result extends ProductsInput {
    products: ProductsInput_products[]
}
interface IResponse {
  result: Result[],
  page: number,
  lastPage: number
}

@injectable()
class IndexProductInputService {
    constructor(
        @inject('ProductRepository')
        private productRepository: IProductRepository,
        @inject('Numeric')
        private numeric: INumeric,
      ) {}
    
      public async execute({page, quant = 10, startDate, endDate}: IRequest): Promise<IResponse>{
        const count = await this.productRepository.countProductInput(startDate, endDate)
        let lastPage = count / quant
        
        if(this.numeric.isFloat(lastPage)) lastPage = parseInt(String(lastPage + 1))
    
        let pageFind = 0
        if (page !== 0) pageFind = page - 1
        const inputs = await this.productRepository.indexProductInput(startDate, endDate, pageFind * quant, quant);
    
        const result: Result[] = []

        await Promise.all(
            inputs.map(async input => {
                const products = await this.productRepository.findByProductInputId(input.id)
                result.push({
                    ...input,
                    products
                })
            })
        )

        return {
          result: result.sort(this.compare),
          lastPage,
          page
        }
    }

    private compare(a: Result,b: Result) {
      if(a.date < b.date) return 1
      return -1
    }

}

export default IndexProductInputService;