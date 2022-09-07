import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('addresses')
export class Addresses {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    zipCode: string;
    @Column()
    street: string;
    @Column()
    complement: string;
    @Column()
    district: string;
    @Column()
    city: string;
    @Column()
    state: string;
    @Column()
    number: number;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
}