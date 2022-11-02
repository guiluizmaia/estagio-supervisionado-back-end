import IFormPaymentRepository, { FormPaymentDtos } from "../../../../../modules/sales/repositories/IFormPaymentRepository";
import { getRepository, Repository, ILike } from "typeorm";
import { FormPayment } from "../entities/FormPayment";

export class FormPaymentRepository implements IFormPaymentRepository {
    private repository: Repository<FormPayment>
    
    constructor(){
        this.repository = getRepository(FormPayment);
    }
    async findByName(name: string): Promise<FormPayment | undefined> {
        return this.repository.findOne({where:{formPayment: ILike(`%${name}%`), active: true}});
    }

    async findById(id: string): Promise<FormPayment | undefined> {
        return this.repository.findOne(id);
    }

    async create(formPayment: FormPaymentDtos): Promise<FormPayment> {
        const create = await this.repository.create(formPayment);
        return this.repository.save(create)
    }
    
    async save(formPayment: FormPayment): Promise<FormPayment> {
        return this.repository.save(formPayment)
    }
    
    async index(skip: number = 0, take: number = 0): Promise<FormPayment[]> {
        return this.repository.find({
            skip,
            take,
            where: {active: true}
        })
    }
    
    async count(): Promise<number> {
        return this.repository.count({where: {active: true}});
    }
    
    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}
