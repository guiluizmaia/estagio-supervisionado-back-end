import { Request, Response } from 'express';
import CreateProductService from '../../../services/CreateProductService';
import DeleteProductService from '../../../services/DeleteProductService';
import FindByIdProductInputService from '../../../services/FindByIdProductInputService';
import FindByIdProductService from '../../../services/FindByIdProductService';
import IndexAndSearchProductService from '../../../services/IndexAndSearchProductService';
import IndexProductInputService from '../../../services/IndexProductInputService';
import IndexProductService from '../../../services/IndexProductService';
import InputProductService from '../../../services/InputProductService';
import UpdateProductService from '../../../services/UpdateProductService';
import { container } from 'tsyringe';
import IndexAndSearchAllProductService from 'src/modules/products/services/IndexAndSearchAllProductService';

class ProductReportController {
  // public async get(request: Request, response: Response): Promise<Response> {
  //   const { initialDate, finalDate } = request.params;
  //   const { id } = request.user;

  //   const created = await container
  //     .resolve(CreateProductService)
  //     .execute({userId: id});

  //   return response.status(201).json(created);
  // }


}

export default ProductReportController;
