import { inject, injectable } from 'tsyringe';
import IUserRepository, { UserDtos } from '../repositories/IUserRepository';
import ICryptHash from '../../../infra/utils/CryptHash/ICryptHash';
import AppError from 'src/infra/http/errors/AppError';
import { User } from '../infra/typeorm/entities/User';
import IPermissionsRepository from '../repositories/IPermissionsRepository';

interface IRequest extends User {
  emailUpdater: string;
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('PermissionsRepository')
    private permissionsRepository: IPermissionsRepository,
    @inject('CryptHash')
    private cryptHash: ICryptHash,
  ) {}

  public async execute({id, email, emailUpdater, password, ...userUpdated}: IRequest): Promise<User> {
    if(email !== emailUpdater){
      const userUpdater = await this.userRepository.findByEmail(emailUpdater);

      if (!userUpdater) 
        throw new AppError('User not found!', 404);


      if(userUpdater.permission.permission !== 'ADMIN')
        throw new AppError('User not have permission ADMIN!', 402);

    }

    if (!id) {
      const user = await this.userRepository.findByEmail(email);

      if (!user) {
        throw new AppError('User not found!', 404);
      }

      Object.assign(user, {email, ...userUpdated});

      if (user.permissionId){
        const permission = await this.permissionsRepository.findById(user.permissionId);

        if(!permission) {
          throw new AppError('Permission not found', 404)
        }

        user.permission = permission;
      }

      if (password) {
        user.password = await this.cryptHash.create(password);
      }

      if(user.email !== 'admin@admin.com')
        return this.userRepository.save(user);
    } else {
      const user = await this.userRepository.findById(id);

      if (!user) {
        throw new AppError('User not found!', 404);
      }

      Object.assign(user, {email, ...userUpdated});

      if (user.permissionId){
        const permission = await this.permissionsRepository.findById(user.permissionId);
        
        if(!permission) {
          throw new AppError('Permission not found', 404)
        }
      
        user.permission = permission;
      }

      if (password) {
        user.password = await this.cryptHash.create(password);
      }

      if(user.email !== 'admin@admin.com')
        return this.userRepository.save(user);
    }
  }
}

export default UpdateUserService;
