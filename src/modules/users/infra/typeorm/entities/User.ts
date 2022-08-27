import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Permission } from "./Permission";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @ManyToOne((type) => Permission, permission => permission.users)
    @JoinColumn({name: "permissionId"})
    permission: Promise<Permission>;
    @Column()
    permissionId: string;
    @Column()
    name: string;
    @Column()
    email: string;
    @Column()
    password: string;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
}