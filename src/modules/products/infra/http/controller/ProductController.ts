import { Request, Response } from 'express';
import CreateProductService from 'src/modules/products/services/CreateProductService';
import DeleteProductService from 'src/modules/products/services/DeleteProductService';
import FindByIdProductService from 'src/modules/products/services/FindByIdProductService';
import IndexAndSearchProductService from 'src/modules/products/services/IndexAndSearchProductService';
import IndexProductService from 'src/modules/products/services/IndexProductService';
import UpdateProductService from 'src/modules/products/services/UpdateProductService';
import { container } from 'tsyringe';

class ProductController {
  public async create(request: Request, response: Response): Promise<Response> {
    const data = request.body;
    const { email: emailCreater } = request.user;

    const created = await container
      .resolve(CreateProductService)
      .execute(data);

    return response.status(201).json(created);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const data = request.body;

    const user = await container
      .resolve(UpdateProductService)
      .execute(data);

    return response.status(200).json(user);
  }

  public async findById(request: Request, response: Response): Promise<Response> {
    const {id} = request.params;

    const product = await container
      .resolve(FindByIdProductService)
      .execute({id});

    return response.status(200).json(product);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const {id} = request.params;

    const deleted = await container
      .resolve(DeleteProductService)
      .execute({id});

    return response.status(200).json(deleted);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    let { page, search } = request.query;

    if(isNaN(Number(page))) page = '0'
    
    if(!search){
      const products = await container
        .resolve(IndexProductService)
        .execute({page: Number(page)});

      return response.status(200).json(products);
    }

    const products = await container
      .resolve(IndexAndSearchProductService)
      .execute({page: Number(page), search: String(search)});

    return response.status(200).json(products);
  }

}

export default ProductController;
