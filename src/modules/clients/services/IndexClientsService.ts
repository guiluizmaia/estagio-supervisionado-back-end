

import { inject, injectable } from 'tsyringe';
import IClientsRepository, { ClientsDtos } from '../repositories/IClientsRepository';
import { Clients } from '../infra/typeorm/entities/Clients';
import IUserRepository from 'src/modules/users/repositories/IUserRepository';
import { Phones } from 'src/modules/commonData/infra/typeorm/entities/Phones';

@injectable()
class IndexClientsService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository
  ) {}

  public async execute(): Promise<Clients[]> {
    return this.clientsRepository.index()
  }
}

export default IndexClientsService;
