import { Request, Response } from 'express';
import CreateFormPaymentService from 'src/modules/sales/services/CreateFormPaymentService';
import DeleteFormPaymentService from 'src/modules/sales/services/DeleteFormPaymentService';
import FindByIdFormPaymentService from 'src/modules/sales/services/FindByIdFormPaymentService';
import IndexFormPaymentService from 'src/modules/sales/services/IndexFormPaymentService';
import UpdateFormPaymentService from 'src/modules/sales/services/UpdateFormPaymentService';
import { container } from 'tsyringe';

class FormPaymentController {
    public async create(request: Request, response: Response): Promise<Response> {
      const data = request.body;
      const created = await container
        .resolve(CreateFormPaymentService)
        .execute(data);

      return response.status(201).json(created);
    }

    public async update(request: Request, response: Response): Promise<Response> {
      const data = request.body;

      const formPayment = await container
        .resolve(UpdateFormPaymentService)
        .execute(data);

      return response.status(200).json(formPayment);
    }

    public async findById(request: Request, response: Response): Promise<Response> {
      const {id} = request.params;

      const formPayment = await container
        .resolve(FindByIdFormPaymentService)
        .execute({id});

      return response.status(200).json(formPayment);
    }

    public async delete(request: Request, response: Response): Promise<Response> {
      const {id} = request.params;

      const deleted = await container
        .resolve(DeleteFormPaymentService)
        .execute({id});

      return response.status(200).json(deleted);
    }

    public async index(request: Request, response: Response): Promise<Response> {
      let { page } = request.query;

      if(isNaN(Number(page))) page = '0'
    
      const formPayment = await container
        .resolve(IndexFormPaymentService)
        .execute({page: Number(page)});

      return response.status(200).json(formPayment);
    }
    
}

export default FormPaymentController