

import { inject, injectable } from 'tsyringe';
import IClientsRepository, { ClientsDtos } from '../repositories/IClientsRepository';
import AppError from 'src/infra/http/errors/AppError';
import { Clients } from '../infra/typeorm/entities/Clients';
import IUserRepository from 'src/modules/users/repositories/IUserRepository';
import { Phones } from 'src/modules/commonData/infra/typeorm/entities/Phones';
import { v4 } from 'uuid';

interface IRequest extends ClientsDtos {
  emailCreater: string;
}

@injectable()
class UpdateClientService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({ emailCreater, id, ...data }: IRequest): Promise<Clients> {
    const userCreater = await this.userRepository.findByEmail(emailCreater);

    if (!userCreater) {
      throw new AppError('User not found!', 404);
    }
    
    const clientscpf = await this.clientsRepository.findByCpf(data.cpf);

    if (clientscpf && clientscpf.id !== id) {
      throw new AppError('Clients with this cpf already exists!', 401);
    }

    if(!id){
      const client = await this.clientsRepository.findByCpf(data.cpf);

      if (!client) {
        throw new AppError('Client not found!', 401);
      }

      if(userCreater.permission.permission !== 'ADMIN'){
        if(userCreater.id !== client.userId)
         throw new AppError('User not have permission!', 402);
      }

      Object.assign(client, data);

      return this.clientsRepository.save(client)
    }

    const client = await this.clientsRepository.findById(id);
      
    if (!client) {
      throw new AppError('Client not found!', 401);
    }
    
    if(userCreater.permission.permission !== 'ADMIN'){
      if(userCreater.id !== client.userId)
       throw new AppError('User not have permission!', 402);
    }
  
    Object.assign(client, data);
  
    console.log(data)
    return this.clientsRepository.save(client)
    
  }
}

export default UpdateClientService;
