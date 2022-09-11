import { inject, injectable } from 'tsyringe';
import IUserRepository from '../repositories/IUserRepository';
import { User } from '../infra/typeorm/entities/User';
import AppError from 'src/infra/http/errors/AppError';
import INumeric from 'src/infra/utils/Numerics/INumeric';

interface IRequest {
  email: string;
  page: number;
  quant?: number;
}

interface IResponse {
  result: User[],
  page: number,
  lastPage: number
}

@injectable()
class IndexUsersService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('Numeric')
    private numeric: INumeric,
  ) {}

  public async execute({email, page, quant = 10}: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User not found!', 404);
    }

    if(user.permission.permission !== 'ADMIN')
      throw new AppError('User not have permission ADMIN!', 402);

    const count = await this.userRepository.count()
    let lastPage = count / quant
    
    if(this.numeric.isFloat(lastPage)) lastPage = parseInt(String(lastPage + 1))

    let pageFind = 0
    if (page !== 0) pageFind = page - 1
    const result = await this.userRepository.index(pageFind * quant, quant);

    return {
      result,
      lastPage,
      page
    }

  }
}

export default IndexUsersService;
