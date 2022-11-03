

import { inject, injectable } from 'tsyringe';
import IClientsRepository from '../repositories/IClientsRepository';
import { Clients } from '../infra/typeorm/entities/Clients';
import INumeric from '../../../infra/utils/Numerics/INumeric';

interface IRequest {
  search: string;
}

@injectable()
class IndexAndSearchAllClientsService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
    @inject('Numeric')
    private numeric: INumeric,
  ) {}

  public async execute({search}: IRequest): Promise<Clients[]> {
    return this.clientsRepository.searchAll(search);
  }
}

export default IndexAndSearchAllClientsService;
