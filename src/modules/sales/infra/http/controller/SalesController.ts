import { Request, Response } from 'express';
import CreateSalesService from 'src/modules/sales/services/CreateSalesService';
import DeleteSalesService from 'src/modules/sales/services/DeleteSalesService';
import FindByIdSalesService from 'src/modules/sales/services/FindByIdSalesService';
import FindSalesService from 'src/modules/sales/services/FindSalesService';
import IndexSalesService from 'src/modules/sales/services/IndexSalesService';
import UpdateSalesService from 'src/modules/sales/services/UpdateSalesService';
import { container } from 'tsyringe';

class SalesController {
    public async create(request: Request, response: Response): Promise<Response> {
      const data = request.body;
      const created = await container
        .resolve(CreateSalesService)
        .execute(data);

      return response.status(201).json(created);
    }

    public async update(request: Request, response: Response): Promise<Response> {
      const data = request.body;

      const sales = await container
        .resolve(UpdateSalesService)
        .execute(data);

      return response.status(200).json(sales);
    }

    public async findById(request: Request, response: Response): Promise<Response> {
      const {id} = request.params;

      const sales = await container
        .resolve(FindByIdSalesService)
        .execute({id});

      return response.status(200).json(sales);
    }

    public async findByClientId(request: Request, response: Response): Promise<Response> {
      const {id} = request.params;

      const sales = await container
        .resolve(FindSalesService)
        .execute({id, by: "clientId"});

      return response.status(200).json(sales);
    }

    public async findByPaymentId(request: Request, response: Response): Promise<Response> {
      const {id} = request.params;

      const sales = await container
        .resolve(FindSalesService)
        .execute({id, by: "paymentId"});

      return response.status(200).json(sales);
    }

    public async findByUserId(request: Request, response: Response): Promise<Response> {
      const {id} = request.params;

      const sales = await container
        .resolve(FindSalesService)
        .execute({id, by: "userId"});

      return response.status(200).json(sales);
    }

    public async delete(request: Request, response: Response): Promise<Response> {
      const {id} = request.params;

      const deleted = await container
        .resolve(DeleteSalesService)
        .execute({id});

      return response.status(200).json(deleted);
    }

    public async index(request: Request, response: Response): Promise<Response> {
      let { page } = request.query;

      if(isNaN(Number(page))) page = '0'
    
      const sales = await container
        .resolve(IndexSalesService)
        .execute({page: Number(page)});

      return response.status(200).json(sales);
    }
    
}

export default SalesController