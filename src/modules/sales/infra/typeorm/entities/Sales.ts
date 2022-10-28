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
    @JoinColumn({name: "usersId"})
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
    @Column()
    canceled: boolean;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
}