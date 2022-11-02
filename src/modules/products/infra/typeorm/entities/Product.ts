import { Provider } from "../../../../../modules/providers/infra/typeorm/entities/Provider";
import { User } from "../../../../../modules/users/infra/typeorm/entities/User";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @ManyToOne((type) => User, user => user.products, {
        eager: true
    })
    @JoinColumn({name: "userId"})
    user: User;
    @Column()
    userId: string;
    @ManyToOne((type) => Provider, provider => provider.products, {
        eager: true
    })
    @JoinColumn({name: "providerId"})
    provider: Provider;
    @Column()
    providerId: string;
    @Column()
    name: string;
    @Column()
    description: string;
    @Column()
    paidPrice: number;
    @Column()
    salePrice: number;
    @Column()
    qntd: number;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
}