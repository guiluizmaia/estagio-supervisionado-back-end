import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ClientsReportService from '@/modules/clients/services/ClientsReportService';

class ClientsReportController {
  public async get(request: Request, response: Response): Promise<Response> {
    const { startdate, enddate } = request.query;

    let startDate;
    let endDate;
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

    const report = await container
      .resolve(ClientsReportService)
      .execute({ finalDate: endDate, startDate: startDate });

    return response.status(200).json(report);
  }
}

export default ClientsReportController;
