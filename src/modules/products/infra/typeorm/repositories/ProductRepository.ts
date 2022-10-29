import IProductRepository, { ProductDtos, ProductHistoricDtos, ProductInputDtos, ProductInput_ProductsDtos } from "src/modules/products/repositories/IProductRepository";
import { getRepository, Repository, ILike, In, MoreThanOrEqual, LessThanOrEqual, Raw } from "typeorm";
import { Product } from "../entities/Product";
import { ProductHistoric, ProductsInput, ProductsInput_products } from "../entities/ProductHistoric";

export class ProductRepository implements IProductRepository{
    private repository: Repository<Product>;
    private historicRepository: Repository<ProductHistoric>;
    private productInput: Repository<ProductsInput>;
    private productInputRelational: Repository<ProductsInput_products>;

    constructor(){
        this.repository = getRepository(Product);
        this.historicRepository = getRepository(ProductHistoric);
        this.productInput = getRepository(ProductsInput);
        this.productInputRelational = getRepository(ProductsInput_products);
    }
    
    async countProductInput(startDate: Date, endDate: Date): Promise<number> {
        return this.productInput.count({
            where: {
                date: Raw(date => `${date} >= '${startDate.toISOString()}' AND ${date} <= '${endDate.toISOString()}'`),
            }
        }
        );
    }

    async indexProductInput(startDate: Date, endDate: Date, skip: number = 0, take: number = 10): Promise<ProductsInput[]> {
        return this.productInput.find({
            skip,
            take,
            where: {
                date: Raw(date => `${date} >= '${startDate.toISOString()}' AND ${date} <= '${endDate.toISOString()}'`),
            }
        })
    }
    
    async createProductInput(product: ProductInputDtos): Promise<ProductsInput> {
        const create = this.productInput.create(product);
        return this.productInput.save(create)
    }

    async updateProductInput(product: ProductsInput): Promise<ProductsInput> {
        return this.productInput.save(product)
    }
    
    async deleteProductInput(id: string): Promise<void> {
        await this.productInput.delete(id);
    }

    async findByIdProductInput(id: String): Promise<ProductsInput | undefined> {
        return this.productInput.findOne({where: {id}})
    }

    async createProductInput_Products(product: ProductInput_ProductsDtos): Promise<ProductsInput_products> {
        const create = this.productInputRelational.create(product);
        return this.productInputRelational.save(create)
    }

    async deleteProductInput_Products(id: string): Promise<void> {
        await this.productInputRelational.delete(id);
    }
    
    async findByProductInputId(id: String): Promise<ProductsInput_products[]> {
        return this.productInputRelational.find({where: {productsInputId: id}})
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