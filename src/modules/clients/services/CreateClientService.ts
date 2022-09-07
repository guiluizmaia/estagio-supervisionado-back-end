

import { inject, injectable } from 'tsyringe';
import IClientsRepository, { ClientsDtos } from '../repositories/IClientsRepository';
import AppError from 'src/infra/http/errors/AppError';
import { Clients } from '../infra/typeorm/entities/Clients';
import IUserRepository from 'src/modules/users/repositories/IUserRepository';
import { Phones } from 'src/modules/commonData/infra/typeorm/entities/Phones';

interface IRequest extends ClientsDtos {
  emailCreater: string;
}

@injectable()
class CreateClientService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({ name, rg, cpf, phones, addresses, emailCreater }: IRequest): Promise<Clients> {
    const userCreater = await this.userRepository.findByEmail(emailCreater);

    if (!userCreater) {
      throw new AppError('User not found!', 404);
    }

    const clients = await this.clientsRepository.findByCpf(cpf);

    if (clients) {
      throw new AppError('Clients already exists!', 401);
    }

    return this.clientsRepository.create({
        name,
        rg,
        cpf,
        phones,
        addresses,
        userId: userCreater.id,
        initDate: new Date(),
        active: true
    })
  }
}

export default CreateClientService;
