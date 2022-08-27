import { getRepository, Repository } from "typeorm";
import IUserRepository, { UserDtos } from "../../../repositories/IUserRepository";
import { User } from "../entities/User";

export class UserRepository implements IUserRepository {
    private repository: Repository<User>;

    constructor(){
        this.repository = getRepository(User);
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
    
    async index(): Promise<User[]> {
        return this.repository.find()
    }

    async findByEmail(email: String): Promise<User | undefined> {
        const user = await this.repository.findOne({where: { email }})
        
        return user;
    }
}