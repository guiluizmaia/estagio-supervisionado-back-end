

import { inject, injectable } from 'tsyringe';
import IClientsRepository, { ClientsDtos } from '../repositories/IClientsRepository';
import { Clients } from '../infra/typeorm/entities/Clients';
import IUserRepository from '../../../modules/users/repositories/IUserRepository';
import { Phones } from '../../../modules/commonData/infra/typeorm/entities/Phones';
import AppError from '../../../infra/http/errors/AppError';

@injectable()
class FindByCpfClientsService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository
  ) {}

  public async execute(cpf: string): Promise<Clients> {
    const client = await this.clientsRepository.findByCpf(cpf);

    if(!client)
      throw new AppError("Client not found", 400)
    
    return client
  }
}

export default FindByCpfClientsService;
