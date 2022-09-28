import AppError from "src/infra/http/errors/AppError";
import IProviderRepository, { ProviderDtos } from "src/modules/providers/repositories/IProviderRepository";
import IUserRepository from "src/modules/users/repositories/IUserRepository";
import { inject, injectable } from "tsyringe";
import { Provider } from "../infra/typeorm/entities/Provider";

interface IRequest extends ProviderDtos {}

@injectable()
class CreateProviderService {
    constructor(
        @inject('ProviderRepository')
        private providerRepository: IProviderRepository,
        @inject('UserRepository')
        private userRepository: IUserRepository,
      ) {}

    public async execute(data: IRequest): Promise<Provider>{
        const user = await this.userRepository.findById(data.userId)

        if(!user) throw new AppError("User not found", 404)

        data.userId = user.id

        return this.providerRepository.create(data);
    }
}

export default CreateProviderService;
