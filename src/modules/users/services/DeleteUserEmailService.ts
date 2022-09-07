import { inject, injectable } from 'tsyringe';
import IUserRepository from '../repositories/IUserRepository';
import AppError from 'src/infra/http/errors/AppError';

interface IRequest {
  emailDeleter: string;
  id: string;
}

@injectable()
class DeleteUserEmailService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({ emailDeleter, id }: IRequest): Promise<void> {
    const user = await this.userRepository.findByEmail(emailDeleter);

    if (!user) 
      throw new AppError('User not found!', 404);

    if(user.permission.permission !== 'ADMIN')
      throw new AppError('User not have permission ADMIN!', 402);

    await this.userRepository.delete(id);
  }
}

export default DeleteUserEmailService;
