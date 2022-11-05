import { Request, Response } from 'express';
import SalesReportService from 'src/modules/sales/services/SalesReportService';
import { container } from 'tsyringe';

class SalesReportController {
  public async get(request: Request, response: Response): Promise<Response> {
    const { startdate, enddate } = request.query;

    let startDate;
    let endDate;
    if(!startdate){ 
      startDate = new Date('2021-07-12')
    } else {
      startDate = new Date(String(startdate))
    }

    if(!enddate){ 
      endDate = new Date()
    } else {
      endDate = new Date(String(enddate))
      endDate.setDate(endDate.getDate() + 1)
    }

    const report = await container
      .resolve(SalesReportService)
      .execute({finalDate: endDate, startDate: startDate});

    return response.status(200).json(report);
  }


}

export default SalesReportController;
