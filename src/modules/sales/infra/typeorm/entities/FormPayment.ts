import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Sales } from "./Sales";

@Entity('formPayment')
export class FormPayment {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    formPayment: string;
    @OneToMany((type) => Sales, formPayment => FormPayment)
    sales: Promise<Sales[]>;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
}