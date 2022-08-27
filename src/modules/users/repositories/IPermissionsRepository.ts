import { Permission } from '../infra/typeorm/entities/Permission';

interface IPermissionsRepository {
  index(): Promise<Permission[]>;
}

export default IPermissionsRepository;
