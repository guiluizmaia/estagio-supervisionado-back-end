import AppError from "../../../infra/http/errors/AppError";
import IProviderRepository, { ProviderDtos } from "../../../modules/providers/repositories/IProviderRepository";
import IUserRepository from "../../../modules/users/repositories/IUserRepository";
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

        return this.providerRepository.create({...data, exclude: false});
    }
}

export default CreateProviderService;
