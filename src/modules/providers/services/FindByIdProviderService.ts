import AppError from "../../../infra/http/errors/AppError";
import IProviderRepository, { ProviderDtos } from "../../../modules/providers/repositories/IProviderRepository";
import IUserRepository from "../../../modules/users/repositories/IUserRepository";
import { inject, injectable } from "tsyringe";
import { Provider } from "../infra/typeorm/entities/Provider";

interface IRequest {
    id: string
}

@injectable()
class FindByIdProviderService {
    constructor(
        @inject('ProviderRepository')
        private providerRepository: IProviderRepository,
      ) {}

    public async execute(data: IRequest): Promise<Provider>{
        const provider = await this.providerRepository.findById(data.id)

        if(!provider) throw new AppError("User not found", 404)

        return provider;
    }
}

export default FindByIdProviderService;
