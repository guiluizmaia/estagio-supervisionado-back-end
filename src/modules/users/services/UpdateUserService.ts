import { inject, injectable } from 'tsyringe';
import IUserRepository, { UserDtos } from '../repositories/IUserRepository';
import ICryptHash from '../../../infra/utils/CryptHash/ICryptHash';
import AppError from 'src/infra/http/errors/AppError';
import { User } from '../infra/typeorm/entities/User';

interface IRequest extends User {
  emailUpdater: string;
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('CryptHash')
    private cryptHash: ICryptHash,
  ) {}

  public async execute({email, emailUpdater, password, ...userUpdated}: IRequest): Promise<User> {
    const user = await this.userRepository.findByEmail(email);

    if(email !== emailUpdater){
      const userUpdater = await this.userRepository.findByEmail(emailUpdater);
            
      if (!userUpdater) 
        throw new AppError('User not found!', 404);

      if(userUpdater.permission.permission !== 'ADMIN')
        throw new AppError('User not have permission ADMIN!', 402);

    }

    if (!user) {
      throw new AppError('User not found!', 404);
    }

    if(user.permission.permission !== 'ADMIN')
      throw new AppError('User not have permission ADMIN!', 402);

    Object.assign(user, userUpdated);

    return this.userRepository.save(user);
  }
}

export default UpdateUserService;
