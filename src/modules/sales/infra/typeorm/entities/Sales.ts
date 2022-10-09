import { Clients } from "src/modules/clients/infra/typeorm/entities/Clients";
import { Product } from "src/modules/products/infra/typeorm/entities/Product";
import { User } from "src/modules/users/infra/typeorm/entities/User";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { FormPayment } from "./FormPayment";

@Entity('sales')
export class Sales {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    clientsId: string;
    @ManyToOne((type) => Clients, client => client.sales, {
        eager: true
    })
    @JoinColumn({name: "clientsId"})
    client: Clients
    @Column()
    usersId: string;
    @ManyToOne((type) => User, user => user.sales, {
        eager: true
    })
    @JoinColumn({name: "userId"})
    user: User
    @Column()
    formPaymentId: string;
    @ManyToOne((type) => FormPayment, formPayment => formPayment.sales, {
        eager: true
    })
    @JoinColumn({name: "formPaymentId"})
    formPayment: FormPayment
    @Column()
    amount: number;
    @ManyToMany((type) => Product, {
        cascade: true,
        eager: true
    })
    @JoinTable({
        name: "products_sales",
        joinColumn: { name: "saleId", referencedColumnName: "id"},
        inverseJoinColumn: { name: "productId" }
    })
    products: Product[];
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
}