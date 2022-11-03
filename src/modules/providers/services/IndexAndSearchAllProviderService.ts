import IProviderRepository from "../repositories/IProviderRepository";
import { inject, injectable } from "tsyringe";
import { Provider } from "../infra/typeorm/entities/Provider";


interface IRequest {
    search: string;
  }

@injectable()
class IndexAndSearchAllProviderService {
    constructor(
        @inject('ProviderRepository')
        private providerRepository: IProviderRepository,
      ) {}

    public async execute({search}: IRequest): Promise<Provider[]>{
      return this.providerRepository.searchAll(search);

    }
}

export default IndexAndSearchAllProviderService;
