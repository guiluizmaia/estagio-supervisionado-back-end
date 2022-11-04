import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ProductReportService from 'src/modules/products/services/ProductReportService';

class ProductReportController {
  public async get(request: Request, response: Response): Promise<Response> {
    const { initialDate, finalDate } = request.params;
    const { id } = request.user;

    let startDate;
    let endDate;
    if(!initialDate){ 
      startDate = new Date('2021-07-12')
    } else {
      startDate = new Date(String(initialDate))
    }

    if(!finalDate){ 
      endDate = new Date()
    } else {
      endDate = new Date(String(finalDate))
    }

    const report = await container
      .resolve(ProductReportService)
      .execute({finalDate: endDate, startDate: startDate});

    return response.status(200).json(report);
  }


}

export default ProductReportController;
