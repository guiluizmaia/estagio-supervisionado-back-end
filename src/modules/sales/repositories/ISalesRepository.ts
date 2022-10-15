import { Sales } from "../infra/typeorm/entities/Sales";
import { ProductsSales } from "../infra/typeorm/entities/ProductsSales";


export interface SaleDtos{
    clientsId: string;
    usersId: string;
    formPaymentId: string;
    amount: number;
}

export interface SalesProductsDtos{
    productId: string;
    saleId: string;
    qntd: number;
    name: string;
    price: number;
}

interface ISalesRepository {
    findById(id: string): Promise<Sales | undefined>;
    findByClientId(id: string): Promise<Sales[]>;
    findByUserId(id: string): Promise<Sales[]>;
    findByPaymentId(id: string): Promise<Sales[]>;
    create(sale: SaleDtos): Promise<Sales>;
    createSalesProducts(sale: SalesProductsDtos): Promise<ProductsSales>;
    FindBySaleIdSalesProducts(id: string): Promise<ProductsSales[]>;
    save(sale: Sales): Promise<Sales>;
    index(skip?: number, take?: number): Promise<Sales[]>;
    count(): Promise<number>;
    delete(id: string): Promise<void>;
}

export default ISalesRepository