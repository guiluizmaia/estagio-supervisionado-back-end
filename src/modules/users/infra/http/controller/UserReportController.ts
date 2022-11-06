import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UsersReportService from 'src/modules/users/services/UsersReportService';

class UserReportController {
  public async get(request: Request, response: Response): Promise<Response> {
    const { initialDate, finalDate } = request.params;

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
      .resolve(UsersReportService)
      .execute({finalDate: endDate, startDate: startDate});

    return response.status(200).json(report);
  }


}

export default UserReportController;
