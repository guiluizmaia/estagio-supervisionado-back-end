import { User } from '../infra/typeorm/entities/User';

export interface UserDtos {
  email: string;
  password: string;
  permissionId: string;
  name: string;
}

interface IUserRepository {
  findByEmail(email: String): Promise<User | undefined>;
  findById(id: String): Promise<User | undefined>;
  create(user: UserDtos): Promise<User>;
  save(user: User): Promise<User>;
  index(skip?: number, take?: number): Promise<User[]>;
  count(): Promise<number>;
  delete(id: string): Promise<void>;
}

export default IUserRepository;
