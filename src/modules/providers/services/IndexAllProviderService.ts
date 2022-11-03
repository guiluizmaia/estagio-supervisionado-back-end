import IProviderRepository from "../repositories/IProviderRepository";
import { inject, injectable } from "tsyringe";
import { Provider } from "../infra/typeorm/entities/Provider";




@injectable()
class IndexAllProviderService {
    constructor(
        @inject('ProviderRepository')
        private providerRepository: IProviderRepository,
      ) {}

    public async execute(): Promise<Provider[]>{
      return this.providerRepository.indexAll();

    }
}

export default IndexAllProviderService;
