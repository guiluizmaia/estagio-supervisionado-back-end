import ISalesRepository, { SaleDtos, SalesProductsDtos } from "../../../../../modules/sales/repositories/ISalesRepository";
import { getRepository, Repository, Raw } from "typeorm";
import { ProductsSales } from "../entities/ProductsSales";
import { Sales } from "../entities/Sales";

export class SalesRepository implements ISalesRepository{
    private repository: Repository<Sales>
    private repositoryProductSales: Repository<ProductsSales>

    
    constructor(){
        this.repository = getRepository(Sales);
        this.repositoryProductSales = getRepository(ProductsSales);
    }
    async FindBySaleIdSSalesProducts(ids: string[]): Promise<ProductsSales[]> {
        const productsQuery = await this.repositoryProductSales
            .createQueryBuilder('p')
            .where('p."saleId" in (:...ids)', {ids})
            .orderBy('p.created_at', 'DESC');

        return productsQuery.getMany()
    }

    async salesOfClientsInDatePeriod(clientsId: string[], startDate: Date, endDate: Date): Promise<Sales[]> {
        const clientsQuery = await this.repository
            .createQueryBuilder('c')
            .where('c.canceled = false')
            .andWhere('c."clientsId" in (:...clientsId)', {clientsId})
            .andWhere('c.created_at >= :startDate', {startDate: startDate.toISOString()})
            .andWhere('c.created_at < :endDate', {endDate: endDate.toISOString()})
            .orderBy('c.created_at', 'DESC');

        return clientsQuery.getMany();
    }
    
    async findInDate(startDate: Date, endDate: Date, canceled: Boolean): Promise<Sales[]> {
        return this.repository.find({
            where: {
                created_at: Raw(date => `${date} >= '${startDate.toISOString()}' AND ${date} <= '${endDate.toISOString()}'`),
            },
            order: {
                created_at: 'DESC'
            }
        })
    }
    
    async FindBySaleIdSalesProducts(id: string): Promise<ProductsSales[]> {
        return this.repositoryProductSales.find({
            where: {saleId: id}, 
            order: {
                created_at: 'DESC'
            }
        })
    }
    
    async createSalesProducts(sale: SalesProductsDtos): Promise<ProductsSales> {
        const created = this.repositoryProductSales.create(sale);
        return this.repositoryProductSales.save(created);
    }

    async findById(id: string): Promise<Sales | undefined> {
        return this.repository.findOne(id);
    }
    
    async findByClientId(id: string): Promise<Sales[]> {
        return this.repository.find({
            where: {clientsId: id}, 
            order: {
                created_at: 'DESC'
            }
        });
    }
    
    async findByUserId(id: string): Promise<Sales[]> {
        return this.repository.find({
            where: {usersId: id},
            order: {
                created_at: 'DESC'
            }
        });
    }
    
    async findByPaymentId(id: string): Promise<Sales[]> {
        return this.repository.find({
            where: {formPaymentId: id}, 
            order: {
                created_at: 'DESC'
            }
        });
    }
    
    async create(sale: SaleDtos): Promise<Sales> {
        const create = this.repository.create(sale);
        return this.repository.save(create);
    }
    
    async save(sale: Sales): Promise<Sales> {
        return this.repository.save(sale)
    }
    
    async index(skip: number = 0, take: number = 0): Promise<Sales[]> {
        return this.repository.find({
            skip,
            take, 
            order: {
                created_at: 'DESC'
            }
        })
    }
    
    async count(): Promise<number> {
        return this.repository.count();
    }
    
    async delete(id: string): Promise<void> {
        await this.repository.delete(id)
    }
}