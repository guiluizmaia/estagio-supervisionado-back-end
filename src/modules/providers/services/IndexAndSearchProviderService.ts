import AppError from "../../../infra/http/errors/AppError";
import INumeric from "../../../infra/utils/Numerics/INumeric";
import IProviderRepository, { ProviderDtos } from "../../../modules/providers/repositories/IProviderRepository";
import IUserRepository from "../../../modules/users/repositories/IUserRepository";
import { inject, injectable } from "tsyringe";
import { Provider } from "../infra/typeorm/entities/Provider";


interface IRequest {
    page: number;
    quant?: number;
    search: string;
  }
  
  interface IResponse {
    result: Provider[],
    page: number,
    lastPage: number
  }

@injectable()
class IndexAndSearchProviderService {
    constructor(
        @inject('ProviderRepository')
        private providerRepository: IProviderRepository,
        @inject('Numeric')
        private numeric: INumeric,
      ) {}

    public async execute({search, page, quant = 10}: IRequest): Promise<IResponse>{
        const count = await this.providerRepository.countSearch(search)
        let lastPage = count / quant
        
        if(this.numeric.isFloat(lastPage)) lastPage = parseInt(String(lastPage + 1))
    
        let pageFind = 0
        if (page !== 0) pageFind = page - 1
        const result = await this.providerRepository.search(search, pageFind * quant, quant);
    
        return {
          result,
          lastPage,
          page
        }
    }
}

export default IndexAndSearchProviderService;
