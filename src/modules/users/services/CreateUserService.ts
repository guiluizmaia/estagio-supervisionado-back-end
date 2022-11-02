import { inject, injectable } from 'tsyringe';
import IUserRepository, { UserDtos } from '../repositories/IUserRepository';
import ICryptHash from '../../../infra/utils/CryptHash/ICryptHash';
import AppError from '../../../infra/http/errors/AppError';
import { User } from '../infra/typeorm/entities/User';

interface IRequest extends UserDtos {
  emailCreater: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('CryptHash')
    private cryptHash: ICryptHash,
  ) {}

  public async execute({ email, password, name, permissionId, emailCreater }: IRequest): Promise<User> {
    const userCreater = await this.userRepository.findByEmail(emailCreater);

    if (!userCreater) {
      throw new AppError('User not found!', 404);
    }

    if(userCreater.permission.permission !== 'ADMIN')
      throw new AppError('User not have permission ADMIN!', 402);

    const user = await this.userRepository.findByEmail(email);

    if (user) {
      throw new AppError('User already exists!', 401);
    }

    const passwordHashed = await this.cryptHash.create(password);

    return this.userRepository.create({
      email: email.trim(),
      password: passwordHashed,
      name: name.trim(),
      permissionId
    })
  }
}

export default CreateUserService;
