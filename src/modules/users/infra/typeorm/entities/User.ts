import { Clients } from "../../../../../modules/clients/infra/typeorm/entities/Clients";
import { Product } from "../../../../../modules/products/infra/typeorm/entities/Product";
import { Provider } from "../../../../../modules/providers/infra/typeorm/entities/Provider";
import { Sales } from "../../../../../modules/sales/infra/typeorm/entities/Sales";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Permission } from "./Permission";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @ManyToOne((type) => Permission, permission => permission.users, {
        eager: true
    })
    @JoinColumn({name: "permissionId"})
    permission: Permission;
    @Column()
    permissionId: string;
    @OneToMany((type) => Clients, user => User)
    clients: Promise<Clients[]>;
    @OneToMany((type) => Sales, user => User)
    sales: Promise<Sales[]>;
    @Column()
    name: string;
    @Column()
    email: string;
    @Column()
    password: string;
    @Column()
    exclude: boolean;
    @OneToMany((type) => Provider, user => User)
    providers: Promise<Provider[]>;
    @OneToMany((type) => Product, user => User)
    products: Promise<Product[]>;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
}