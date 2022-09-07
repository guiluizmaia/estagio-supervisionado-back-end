import { inject, injectable } from 'tsyringe';
import IUserRepository from '../repositories/IUserRepository';
import { User } from '../infra/typeorm/entities/User';
import AppError from 'src/infra/http/errors/AppError';

interface IRequest {
  email: string;
}

@injectable()
class IndexUsersService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({email}: IRequest): Promise<User[]> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User not found!', 404);
    }

    if(user.permission.permission !== 'ADMIN')
      throw new AppError('User not have permission ADMIN!', 402);

    return this.userRepository.index();

  }
}

export default IndexUsersService;
