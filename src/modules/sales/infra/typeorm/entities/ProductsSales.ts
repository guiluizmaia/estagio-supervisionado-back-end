import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('products_sales')
export class ProductsSales {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    productId: string;
    @Column()
    saleId: string;
    @Column()
    qntd: number;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
}