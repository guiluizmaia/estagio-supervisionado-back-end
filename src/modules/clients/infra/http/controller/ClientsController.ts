import { Request, Response } from 'express';
import CreateClientService from 'src/modules/clients/services/CreateClientService';
import FindByCpfClientsService from 'src/modules/clients/services/FindByCpfClientsService';
import IndexClientsService from 'src/modules/clients/services/IndexClientsService';
import UpdateClientService from 'src/modules/clients/services/UpdateClientService';
import { container } from 'tsyringe';

class ClientsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, rg, cpf, phones, addresses } = request.body;
    const { email: emailCreater } = request.user;

    const userCreated = await container
      .resolve(CreateClientService)
      .execute({ name, rg, cpf, phones, addresses, emailCreater });

    return response.status(201).json(userCreated);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, rg, cpf, phones, addresses } = request.body;
    const { email: emailCreater } = request.user;

    const user = await container
      .resolve(UpdateClientService)
      .execute({ name, rg, cpf, phones, addresses, emailCreater });

    return response.status(200).json(user);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const users = await container
      .resolve(IndexClientsService)
      .execute();

    return response.status(200).json(users);
  }

  public async findByCpf(request: Request, response: Response): Promise<Response> {
    const { cpf } = request.body;
    
    const users = await container
      .resolve(FindByCpfClientsService)
      .execute(cpf);

    return response.status(200).json(users);
  }
}

export default ClientsController;
