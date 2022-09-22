import IClientsRepository, { ClientsDtos } from "src/modules/clients/repositories/IClientsRepository";
import { getRepository, ILike, Repository } from "typeorm";
import { Clients } from "../entities/Clients";

export class ClientsRepository implements IClientsRepository{
    private repository: Repository<Clients>;

    constructor(){
        this.repository = getRepository(Clients);
    }

    async count(): Promise<number> {
        return this.repository.count();
    }

    async countSearch(name: string): Promise<number> {
        return this.repository.count({where: {name: ILike(`%${name}%`)}});
    }
    
    
    async findByCpf(cpf: String): Promise<Clients | undefined> {
        return this.repository.findOne({where: {cpf}});
    }
    
    async findById(id: String): Promise<Clients | undefined> {
        return this.repository.findOne({where: {id}});
    }

    async create(client: ClientsDtos): Promise<Clients> {
        const create = this.repository.create(client);
        return this.repository.save(create);
    }
    
    async save(client: Clients): Promise<Clients> {
        return this.repository.save(client)
    }
    
    async index(skip: number = 0, take: number = 10): Promise<Clients[]> {
        return this.repository.find({
            skip,
            take
        })
    }
    
    async search(name: string, skip: number = 0, take: number = 10): Promise<Clients[]> {
        return this.repository.find({
            where: {name: ILike(`%${name}%`)},
            skip,
            take
        })
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id)
    }
}