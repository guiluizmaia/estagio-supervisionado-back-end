import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";

@Entity('permissions')
export class Permission {
    @PrimaryGeneratedColumn()
    id: string;
    @Column()
    permission: string;
    @OneToMany((type) => User, permission => Permission)
    users: Promise<User[]>;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
}