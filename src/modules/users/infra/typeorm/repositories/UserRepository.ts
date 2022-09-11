import { getRepository, Repository } from "typeorm";
import IUserRepository, { UserDtos } from "../../../repositories/IUserRepository";
import { User } from "../entities/User";

export class UserRepository implements IUserRepository {
    private repository: Repository<User>;

    constructor(){
        this.repository = getRepository(User);
    }

    async count(): Promise<number> {
        return this.repository.count();
    }
    
    async findById(id: String): Promise<User | undefined> {
        return this.repository.findOne({where: {id}});
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }
    
    async create(user: UserDtos): Promise<User> {
        const create = await this.repository.create(user);
        return this.repository.save(create)
    }

    async save(user: User): Promise<User> {
        return this.repository.save(user)
    }
    
    async index(skip: number = 0, take: number = 10): Promise<User[]> {
        return this.repository.find({
            skip,
            take
        })
    }

    async findByEmail(email: String): Promise<User | undefined> {
        const user = await this.repository.findOne({where: { email }})
        
        return user;
    }
}