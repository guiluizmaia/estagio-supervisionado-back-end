import IProviderRepository from "src/modules/providers/repositories/IProviderRepository";
import IUserRepository from "src/modules/users/repositories/IUserRepository";
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
        const provider = await this.providerRepository.findByEmail('test@test.com')

        if(!provider){
            const user = await this.userRepository.findByEmail("admin@admin.com")
            const provider = await this.providerRepository.create({
                name: 'test',
                cnpj: '111111111',
                obs: 'provider of test',
                email: 'test@test.com',
                userId: user!.id
            })
            data.providerId = provider.id;
        } else {
            data.providerId = provider.id;
        }

        return this.productRepository.create(data);
    }
}

export default CreateProductService;
