import IPermissionsRepository from "../../../../../modules/users/repositories/IPermissionsRepository";
import { getRepository, Repository } from "typeorm";
import { Permission } from "../entities/Permission";

export class PermissionsRepository implements IPermissionsRepository {
    private repository: Repository<Permission>;

    constructor(){
        this.repository = getRepository(Permission);
    }
    async findById(id: string): Promise<Permission | undefined> {
        return this.repository.findOne(id)
    }

    async index(): Promise<Permission[]> {
        return this.repository.find()
    }

}