import IClientsRepository, { ClientsDtos } from "../../../../../modules/clients/repositories/IClientsRepository";
import { getRepository, ILike, Repository, Raw } from "typeorm";
import { Clients } from "../entities/Clients";

export class ClientsRepository implements IClientsRepository{
    private repository: Repository<Clients>;

    constructor(){
        this.repository = getRepository(Clients);
    }
    
    async findInDate(startDate: Date, endDate: Date): Promise<Clients[]> {
        return this.repository.find({
            where: {
                created_at: Raw(date => `${date} >= '${startDate.toISOString()}' AND ${date} < '${endDate.toISOString()}'`),
            }
        })
    }

    async indexAll(): Promise<Clients[]> {
        return this.repository.find();
    }

    async count(): Promise<number> {
        return this.repository.count({where: {exclude: false}});
    }

    async countSearch(name: string): Promise<number> {
        return this.repository.count({where: [{name: ILike(`%${name}%`), exclude: false}, {cpf: ILike(`%${name}%`), exclude: false}]});
    }
    
    
    async findByCpf(cpf: String): Promise<Clients | undefined> {
        return this.repository.findOne({where: {cpf, exclude: false}});
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
            take,
            where: {exclude: false}
        })
    }
    
    async search(name: string, skip: number = 0, take: number = 10): Promise<Clients[]> {
        return this.repository.find({
            where: [{name: ILike(`%${name}%`), exclude: false}, {cpf: ILike(`%${name}%`), exclude: false}],
            skip,
            take
        })
    }

    async searchAll(name: string): Promise<Clients[]> {
        return this.repository.find({
            where: [{name: ILike(`%${name}%`), exclude: false}, {cpf: ILike(`%${name}%`), exclude: false}],
        })
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id)
    }
}