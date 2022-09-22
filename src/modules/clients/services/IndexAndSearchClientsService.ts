

import { inject, injectable } from 'tsyringe';
import IClientsRepository, { ClientsDtos } from '../repositories/IClientsRepository';
import { Clients } from '../infra/typeorm/entities/Clients';
import IUserRepository from 'src/modules/users/repositories/IUserRepository';
import { Phones } from 'src/modules/commonData/infra/typeorm/entities/Phones';
import INumeric from 'src/infra/utils/Numerics/INumeric';

interface IRequest {
  page: number;
  quant?: number;
  search: string;
}

interface IResponse {
  result: Clients[],
  page: number,
  lastPage: number
}

@injectable()
class IndexAndSearchClientsService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
    @inject('Numeric')
    private numeric: INumeric,
  ) {}

  public async execute({page, search, quant = 10}: IRequest): Promise<IResponse> {
    const count = await this.clientsRepository.countSearch(search)
    let lastPage = count / quant
    
    if(this.numeric.isFloat(lastPage)) lastPage = parseInt(String(lastPage + 1))

    let pageFind = 0
    if (page !== 0) pageFind = page - 1
    const result = await this.clientsRepository.search(search, pageFind * quant, quant);

    return {
      result,
      lastPage,
      page
    }
  }
}

export default IndexAndSearchClientsService;
