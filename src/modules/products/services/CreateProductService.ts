import AppError from "../../../infra/http/errors/AppError";
import IProviderRepository from "../../../modules/providers/repositories/IProviderRepository";
import IUserRepository from "../../../modules/users/repositories/IUserRepository";
import { inject, injectable } from "tsyringe";
import { Product } from "../infra/typeorm/entities/Product";
import IProductRepository, { ProductDtos } from "../repositories/IProductRepository";

interface IRequest extends ProductDtos {}

@injectable()
class CreateProductService {
    constructor(
        @inject('ProductRepository')
        private productRepository: IProductRepository,
        @inject('ProviderRepository')
        private providerRepository: IProviderRepository,
        @inject('UserRepository')
        private userRepository: IUserRepository,
      ) {}

    public async execute(data: IRequest): Promise<Product>{
        const provider = await this.providerRepository.findById(data.providerId)

        if(!provider) throw new AppError("Provider not found", 404)

        const user = await this.userRepository.findById(data.userId)

        if(!user) throw new AppError("User not found", 404)

        data.providerId = provider.id;
        data.userId = user.id

        return this.productRepository.create(data);
    }
}

export default CreateProductService;
