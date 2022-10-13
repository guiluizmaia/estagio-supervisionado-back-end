import IProductRepository, { ProductDtos, ProductHistoricDtos } from "src/modules/products/repositories/IProductRepository";
import { getRepository, Repository, ILike, In } from "typeorm";
import { Product } from "../entities/Product";
import { ProductHistoric } from "../entities/ProductHistoric";

export class ProductRepository implements IProductRepository{
    private repository: Repository<Product>;
    private historicRepository: Repository<ProductHistoric>;


    constructor(){
        this.repository = getRepository(Product);
        this.historicRepository = getRepository(ProductHistoric);
    }
    
    async findByIds(ids: String[]): Promise<Product[]> {
        return this.repository.find({where: {
            id: In(ids)
        }})
    }

    async countSearch(name: string): Promise<number> {
        return this.repository.count({where: {name: ILike(`%${name}%`)}});
    }

    async search(name: string, skip?: number | undefined, take?: number | undefined): Promise<Product[]> {
        return this.repository.find({
            where: {name: ILike(`%${name}%`)},
            skip,
            take
        })
    }
    
    async createHistoric(historic: ProductHistoricDtos): Promise<ProductHistoric> {
        const create = this.historicRepository.create(historic);
        return this.historicRepository.save(create)
    }

    async findById(id: String): Promise<Product | undefined> {
        return this.repository.findOne({where: {id}})
    }

    async create(product: ProductDtos): Promise<Product> {
        const create = this.repository.create(product);
        return this.repository.save(create)
    }

    async save(product: Product): Promise<Product> {
        return this.repository.save(product);
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