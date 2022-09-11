import { Permission } from '../infra/typeorm/entities/Permission';

interface IPermissionsRepository {
  index(): Promise<Permission[]>;
  findById(id: string): Promise<Permission | undefined>;
}

export default IPermissionsRepository;
