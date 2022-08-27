import { inject, injectable } from 'tsyringe';
import IUserRepository from '../repositories/IUserRepository';
import { sign } from 'jsonwebtoken';
import ICryptHash from '../../../infra/utils/CryptHash/ICryptHash';
import AppError from 'src/infra/http/errors/AppError';
import auth from 'src/configs/auth';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    id: string;
    name: string;
    email: string;
    permissionName: string;
  };
  token: string;
}

@injectable()
class AuthenticateService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('CryptHash')
    private cryptHash: ICryptHash,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);

    const { secretKey, expiresIn, token_validator } = auth;

    if (!user) {
      throw new AppError('Email or password not correct!', 401);
    }

    const passwordMatch = await this.cryptHash.compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Email or password not correct!', 401);
    }

    const token = sign({}, secretKey, {
      subject: `${user.id}|${user.email}`,
      expiresIn: expiresIn,
    });

    
    const {id, name, email: userEmail, permission} = user;

    const tokenReturn: IResponse = {
      token,
      user: {
        id,
        name,
        email: userEmail,
        permissionName: (await permission).permission
      },
    };

    return tokenReturn;
  }
}

export default AuthenticateService;
