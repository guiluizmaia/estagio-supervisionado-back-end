import { inject, injectable } from 'tsyringe';
import IUserRepository from '../repositories/IUserRepository';
import { User } from '../infra/typeorm/entities/User';
import AppError from '../../../infra/http/errors/AppError';
import INumeric from '../../../infra/utils/Numerics/INumeric';

interface IRequest {
  startDate: Date;
  finalDate: Date;
}


@injectable()
class UsersReportService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({startDate, finalDate}: IRequest): Promise<any> {
    const users = await this.userRepository.findInDate(startDate, finalDate);

    
    return users

  }
}

export default UsersReportService;
