import { Product } from "src/modules/products/infra/typeorm/entities/Product";
import { User } from "src/modules/users/infra/typeorm/entities/User";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('providers')
export class Provider {
    @PrimaryGeneratedColumn()
    id: string;
    @Column()
    userId: string;
    @ManyToOne((type) => User, user => user.providers, {
        eager: true
    })
    @JoinColumn({name: "userId"})
    user: User;
    @Column()
    name: string;
    @Column()
    cnpj: string;
    @Column()
    obs: string;
    @Column()
    email: string;
    @OneToMany((type) => Product, provider => Provider)
    products: Promise<Product[]>;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
}