import ISalesRepository from '@/modules/sales/repositories/ISalesRepository';
import { inject, injectable } from 'tsyringe';
import AppError from '../../../infra/http/errors/AppError';
import INumeric from '../../../infra/utils/Numerics/INumeric';
import IClientsRepository from '../repositories/IClientsRepository';

interface IRequest {
  startDate: Date;
  finalDate: Date;
}

@injectable()
class ClientsReportService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
    @inject('SalesRepository')
    private salesRepository: ISalesRepository,
  ) {}

  public async execute({ startDate, finalDate }: IRequest): Promise<any[]> {
    const clients = await this.clientsRepository.findInDate(
      startDate,
      finalDate,
    );

    const ret: any[] = [];
    const clientIds = clients.map(client => {
      ret.push({
        clientId: client.id,
        name: client.name,
        cpf: client.cpf,
        exclude: client.exclude,
        excludeDate: client.exclude ? client.updated_at : undefined,
        initDate: client.initDate,
        salesQuantInPeriod: 0,
        lastSaleDateInPeriod: null,
        valuePayInPeriod: 0,
      });

      return client.id;
    });
    if (clientIds.length > 0) {
      const sales = await this.salesRepository.salesOfClientsInDatePeriod(
        clientIds,
        startDate,
        finalDate,
      );

      ret.forEach((retOne, index) => {
        const salesOfClient = sales.filter(
          sale => sale.clientsId === retOne.clientId,
        );
        salesOfClient.forEach(sales => {
          retOne.salesQuantInPeriod += 1;
          retOne.valuePayInPeriod += Number(sales.amount);

          if (retOne.lastSaleDateInPeriod === null)
            retOne.lastSaleDateInPeriod = sales.created_at;

          if (retOne.lastSaleDateInPeriod < sales.created_at)
            retOne.lastSaleDateInPeriod = sales.created_at;
        });
      });
    }

    return ret;
  }
}

export default ClientsReportService;
