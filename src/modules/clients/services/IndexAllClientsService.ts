

import { inject, injectable } from 'tsyringe';
import IClientsRepository from '../repositories/IClientsRepository';
import { Clients } from '../infra/typeorm/entities/Clients';

@injectable()
class IndexAllClientsService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  public async execute(): Promise<Clients[]> {
    return this.clientsRepository.indexAll();
  }
}

export default IndexAllClientsService;
