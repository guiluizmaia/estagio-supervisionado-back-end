import { getRepository, Repository, Raw } from "typeorm";
import IUserRepository, { UserDtos } from "../../../repositories/IUserRepository";
import { User } from "../entities/User";

export class UserRepository implements IUserRepository {
    private repository: Repository<User>;

    constructor(){
        this.repository = getRepository(User);
    }
    
    async findInDate(startDate: Date, endDate: Date): Promise<User[]> {
        return this.repository.find({
            where: {
                created_at: Raw(date => `${date} >= '${startDate.toISOString()}' AND ${date} <= '${endDate.toISOString()}'`),
                exclude: false
            }
        })
    }

    async count(): Promise<number> {
        return this.repository.count(
            exclude: false
        );
    }
    
    async findById(id: String): Promise<User | undefined> {
        return this.repository.findOne({where: {id}});
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }
    
    async create(user: UserDtos): Promise<User> {
        const create = this.repository.create(user);
        return this.repository.save(create)
    }

    async save(user: User): Promise<User> {
        return this.repository.save(user)
    }
    
    async index(skip: number = 0, take: number = 10): Promise<User[]> {
        return this.repository.find({
            skip,
            take,
            where: {exclude: false}
        })
    }

    async findByEmail(email: String): Promise<User | undefined> {
        const user = await this.repository.findOne({where: { email }})
        
        return user;
    }
}