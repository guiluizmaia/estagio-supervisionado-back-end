import { Request, Response } from 'express';
import CreateProductService from '../../../../../modules/products/services/CreateProductService';
import DeleteProductService from '../../../../../modules/products/services/DeleteProductService';
import FindByIdProductInputService from '../../../../../modules/products/services/FindByIdProductInputService';
import FindByIdProductService from '../../../../../modules/products/services/FindByIdProductService';
import IndexAndSearchProductService from '../../../../../modules/products/services/IndexAndSearchProductService';
import IndexProductInputService from '../../../../../modules/products/services/IndexProductInputService';
import IndexProductService from '../../../../../modules/products/services/IndexProductService';
import InputProductService from '../../../../../modules/products/services/InputProductService';
import UpdateProductService from '../../../../../modules/products/services/UpdateProductService';
import { container } from 'tsyringe';
import IndexAndSearchAllProductService from '@/modules/products/services/IndexAndSearchAllProductService';
import IndexAllProductService from '@/modules/products/services/IndexAllProductService';

class ProductController {
  public async create(request: Request, response: Response): Promise<Response> {
    const data = request.body;
    const { id } = request.user;

    const created = await container
      .resolve(CreateProductService)
      .execute({ ...data, userId: id });

    return response.status(201).json(created);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const data = request.body;

    const product = await container.resolve(UpdateProductService).execute(data);

    return response.status(200).json(product);
  }

  public async findById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const product = await container
      .resolve(FindByIdProductService)
      .execute({ id });

    return response.status(200).json(product);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleted = await container
      .resolve(DeleteProductService)
      .execute({ id });

    return response.status(200).json(deleted);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    let { page, search, all } = request.query;

    if (isNaN(Number(page))) page = '0';

    if (all && search) {
      const products = await container
        .resolve(IndexAndSearchAllProductService)
        .execute({ search: String(search) });

      return response.status(200).json(products);
    }

    if (all) {
      const products = await container
        .resolve(IndexAllProductService)
        .execute();

      return response.status(200).json(products);
    }

    if (!search) {
      const products = await container
        .resolve(IndexProductService)
        .execute({ page: Number(page) });

      return response.status(200).json(products);
    }

    const products = await container
      .resolve(IndexAndSearchProductService)
      .execute({ page: Number(page), search: String(search) });

    return response.status(200).json(products);
  }

  public async input(request: Request, response: Response): Promise<Response> {
    const data = request.body;

    const product = await container.resolve(InputProductService).execute(data);

    return response.status(200).json(product);
  }

  public async indexInput(
    request: Request,
    response: Response,
  ): Promise<Response> {
    let { page, startdate, enddate } = request.query;

    let startDate;
    let endDate;

    if (isNaN(Number(page))) page = '0';

    if (!startdate) {
      startDate = new Date('2021-07-12');
    } else {
      startDate = new Date(String(startdate));
    }

    if (!enddate) {
      endDate = new Date();
    } else {
      endDate = new Date(String(enddate));
      endDate.setDate(endDate.getDate() + 1);
    }

    const productsInput = await container
      .resolve(IndexProductInputService)
      .execute({ page: Number(page), startDate, endDate });

    return response.status(200).json(productsInput);
  }

  public async findByIdInput(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const productInput = await container
      .resolve(FindByIdProductInputService)
      .execute({ id });

    return response.status(200).json(productInput);
  }
}

export default ProductController;
