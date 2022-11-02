import { Request, Response } from 'express';
import CreateProviderService from '../../../../../modules/providers/services/CreateProviderService';
import FindByIdProviderService from '../../../../../modules/providers/services/FindByIdProviderService';
import IndexAndSearchProviderService from '../../../../../modules/providers/services/IndexAndSearchProviderService';
import IndexProviderService from '../../../../../modules/providers/services/IndexProviderService';
import UpdateProviderService from '../../../../../modules/providers/services/UpdateProviderService';
import { container } from 'tsyringe';

class ProviderController {
    public async create(request: Request, response: Response): Promise<Response> {
        const data = request.body;
        const { id } = request.user;
    
        const created = await container
          .resolve(CreateProviderService)
          .execute({...data, userId: id});
    
        return response.status(201).json(created);
      }
    
      public async update(request: Request, response: Response): Promise<Response> {
        const data = request.body;
    
        const user = await container
          .resolve(UpdateProviderService)
          .execute(data);
    
        return response.status(200).json(user);
      }
    
      public async findById(request: Request, response: Response): Promise<Response> {
        const {id} = request.params;
    
        const product = await container
          .resolve(FindByIdProviderService)
          .execute({id});
    
        return response.status(200).json(product);
      }
    
      public async index(request: Request, response: Response): Promise<Response> {
        let { page, search } = request.query;
    
        if(isNaN(Number(page))) page = '0'
        
        if(!search){
          const products = await container
            .resolve(IndexProviderService)
            .execute({page: Number(page)});
    
          return response.status(200).json(products);
        }
    
        const products = await container
          .resolve(IndexAndSearchProviderService)
          .execute({page: Number(page), search: String(search)});
    
        return response.status(200).json(products);
      }
}

export default ProviderController;
