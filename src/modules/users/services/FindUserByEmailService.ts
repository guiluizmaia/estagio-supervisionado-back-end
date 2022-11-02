import { inject, injectable } from 'tsyringe';
import IUserRepository from '../repositories/IUserRepository';
import AppError from '../../../infra/http/errors/AppError';
import { User } from '../infra/typeorm/entities/User';

interface IRequest {
  email: string;
}

@injectable()
class FindUserByEmailService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<User> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User not found!', 404);
    }

    return user;
  }
}

export default FindUserByEmailService;
