import IProviderRepository, { ProviderDtos } from "../../../../../modules/providers/repositories/IProviderRepository";
import { getRepository, Repository, ILike } from "typeorm";
import { Provider } from "../entities/Provider";

export class ProviderRepository implements IProviderRepository {
    private repository: Repository<Provider>;

    constructor(){
        this.repository = getRepository(Provider);
    }
    
    async indexAll(): Promise<Provider[]> {
        return this.repository.find({where: {
            exclude: false
        }})
    }
    
    async searchAll(name: string): Promise<Provider[]> {
        return this.repository.find({
            where: {name: ILike(`%${name}%`), exclude: false},
        })
    }

    async countSearch(name: string): Promise<number> {
        return this.repository.count({where: {name: ILike(`%${name}%`), exclude: false}});
    }

    async search(name: string, skip?: number | undefined, take?: number | undefined): Promise<Provider[]> {
        return this.repository.find({
            where: {name: ILike(`%${name}%`), exclude: false},
            skip,
            take
        })
    }

    async findByEmail(email: String): Promise<Provider | undefined> {
        return this.repository.findOne({where: { email, exclude: false }})        
    }

    async findByCnpj(cnpj: String): Promise<Provider | undefined> {
        return this.repository.findOne({where: { cnpj, exclude: false }})        
    }

    async findById(id: String): Promise<Provider | undefined> {
        return this.repository.findOne({where: {id, exclude: false}});
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
            take,
            where: {exclude: false}
        })
    }

    async count(): Promise<number> {
        return this.repository.count({where: {exclude: false}});
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}