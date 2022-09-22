import IProviderRepository, { ProviderDtos } from "src/modules/providers/repositories/IProviderRepository";
import { getRepository, Repository } from "typeorm";
import { Provider } from "../entities/Provider";

export class ProviderRepository implements IProviderRepository {
    private repository: Repository<Provider>;

    constructor(){
        this.repository = getRepository(Provider);
    }

    async findByEmail(email: String): Promise<Provider | undefined> {
        return this.repository.findOne({where: { email }})        
    }

    async findByCnpj(cnpj: String): Promise<Provider | undefined> {
        return this.repository.findOne({where: { cnpj }})        
    }

    async findById(id: String): Promise<Provider | undefined> {
        return this.repository.findOne({where: {id}});
    }

    async create(provider: ProviderDtos): Promise<Provider> {
        const create = await this.repository.create(provider);
        return this.repository.save(create)
    }

    async save(provider: Provider): Promise<Provider> {
        return this.repository.save(provider)
    }

    async index(skip: number = 0, take: number = 10): Promise<Provider[]> {
        return this.repository.find({
            skip,
            take
        })
    }

    async count(): Promise<number> {
        return this.repository.count();
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}