import IProductRepository, { ProductDtos, ProductHistoricDtos } from "src/modules/products/repositories/IProductRepository";
import { getRepository, Repository } from "typeorm";
import { Product } from "../entities/Product";
import { ProductHistoric } from "../entities/ProductHistoric";

export class ProductRepository implements IProductRepository{
    private repository: Repository<Product>;
    private historicRepository: Repository<ProductHistoric>;


    constructor(){
        this.repository = getRepository(Product);
    }
    
    async createHistoric(historic: ProductHistoricDtos): Promise<ProductHistoric> {
        const create = await this.historicRepository.create(historic);
        return this.historicRepository.save(create)
    }

    async findById(id: String): Promise<Product | undefined> {
        return this.repository.findOne({where: {id}})
    }

    async create(product: ProductDtos): Promise<Product> {
        const create = await this.repository.create(product);
        return this.repository.save(create)
    }

    async save(product: Product): Promise<Product> {
        const create = this.repository.create(product);
        return this.repository.save(create);
    }

    async index(skip: number = 0, take: number = 10): Promise<Product[]> {
        return this.repository.find({
            skip,
            take
        })
    }

    async count(): Promise<number> {
        return this.repository.count();
    }
    
    async delete(id: string): Promise<void> {
        await this.repository.delete(id)
    }
}