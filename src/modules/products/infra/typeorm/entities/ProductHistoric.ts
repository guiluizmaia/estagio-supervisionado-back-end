import { Provider } from "src/modules/providers/infra/typeorm/entities/Provider";
import { User } from "src/modules/users/infra/typeorm/entities/User";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('productsHistoric')
export class ProductHistoric {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    productId: string;
    @Column()
    paidPrice?: number;
    @Column()
    type: string;
    @Column()
    qntd: number;
    @Column()
    qntdAfter: number;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
}

@Entity('productsInput')
export class ProductsInput {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    date: Date;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
}

@Entity('productsInput_products')
export class ProductsInput_products {
    @PrimaryGeneratedColumn("uuid")
    id?: string;
    @Column()
    productsInputId: string;
    @Column()
    productId: string;
    @Column()
    name: string;
    @Column()
    price?: number;
    @Column()
    type: "ADD" | "SUB";
    @Column()
    qntd: number;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
}