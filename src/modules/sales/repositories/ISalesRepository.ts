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
    paidPriceForItem: number;
    providerId: string;
    providerName: string;
}

interface ISalesRepository {
    findById(id: string): Promise<Sales | undefined>;
    findInDate(startDate: Date, endDate: Date, canceled: boolean): Promise<Sales[]>;
    findByClientId(id: string): Promise<Sales[]>;
    findByUserId(id: string): Promise<Sales[]>;
    findByPaymentId(id: string): Promise<Sales[]>;
    create(sale: SaleDtos): Promise<Sales>;
    createSalesProducts(sale: SalesProductsDtos): Promise<ProductsSales>;
    FindBySaleIdSalesProducts(id: string): Promise<ProductsSales[]>;
    FindBySaleIdSSalesProducts(ids: string[]): Promise<ProductsSales[]>;
    save(sale: Sales): Promise<Sales>;
    index(skip?: number, take?: number): Promise<Sales[]>;
    count(): Promise<number>;
    delete(id: string): Promise<void>;
    salesOfClientsInDatePeriod(clientsId: string[], startDate: Date, endDate: Date): Promise<Sales[]>;
}

export default ISalesRepository