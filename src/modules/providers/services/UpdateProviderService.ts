import AppError from "src/infra/http/errors/AppError";
import IProviderRepository, { ProviderDtos } from "src/modules/providers/repositories/IProviderRepository";
import IUserRepository from "src/modules/users/repositories/IUserRepository";
import { inject, injectable } from "tsyringe";
import { Provider } from "../infra/typeorm/entities/Provider";

interface IRequest extends Provider {}

@injectable()
class UpdateProviderService {
    constructor(
        @inject('ProviderRepository')
        private providerRepository: IProviderRepository,
      ) {}

    public async execute(data: IRequest): Promise<Provider>{
        const provider = await this.providerRepository.findById(data.id)

        if(!provider) throw new AppError("User not found", 404)

        Object.assign(provider, data)

        return this.providerRepository.create(provider);
    }
}

export default UpdateProviderService;
