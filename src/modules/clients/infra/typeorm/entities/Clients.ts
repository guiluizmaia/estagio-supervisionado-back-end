import { Addresses } from "src/modules/commonData/infra/typeorm/entities/Addresses";
import { Phones } from "src/modules/commonData/infra/typeorm/entities/Phones";
import { Sales } from "src/modules/sales/infra/typeorm/entities/Sales";
import { User } from "src/modules/users/infra/typeorm/entities/User";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('clients')
export class Clients {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    name: string;
    @Column()
    rg: string;
    @Column()
    cpf: string;
    @Column()
    active: boolean;
    @Column()
    exclude: boolean;
    @Column()
    initDate: Date;
    @Column()
    userId: string;
    @ManyToOne((type) => User, user => user.clients, {
        eager: true
    })
    @JoinColumn({name: "userId"})
    user: User
    @ManyToMany((type) => Phones, {
        cascade: true,
        eager: true
    })
    @JoinTable({
        name: "clients_phones",
        joinColumn: { name: "clientsId", referencedColumnName: "id"},
        inverseJoinColumn: { name: "phonesId" }
    })
    phones: Phones;
    @ManyToMany((type) => Addresses, {
        cascade: true,
        eager: true
    })
    @JoinTable({
        name: "clients_addresses",
        joinColumn: { name: "clientsId", referencedColumnName: "id"},
        inverseJoinColumn: { name: "addressesId" }
    })
    addresses: Addresses;
    @OneToMany((type) => Sales, clients => Clients)
    sales: Promise<Sales[]>;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
}