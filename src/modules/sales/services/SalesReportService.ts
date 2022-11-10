import IProviderRepository from '../../providers/repositories/IProviderRepository';
import { inject, injectable } from 'tsyringe';
import ISalesRepository from '@/modules/sales/repositories/ISalesRepository';
import IProductRepository from '@/modules/products/repositories/IProductRepository';

interface IRequest {
  startDate: Date;
  finalDate: Date;
}

@injectable()
class SalesReportService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
    @inject('ProviderRepository')
    private providerRepository: IProviderRepository,
    @inject('SalesRepository')
    private salesRepository: ISalesRepository,
  ) {}

  public async execute({ startDate, finalDate }: IRequest): Promise<any> {
    const sales = await this.salesRepository.findInDate(
      startDate,
      finalDate,
      false,
    );

    const ret: any[] = [];
    if (sales.length > 0) {
      const salesIds = sales.map(sale => {
        ret.push({
          saleId: sale.id,
          saleDate: sale.created_at,
          value: Number(sale.amount),
          profit: 0,
          clientName: sale.client.name,
          clientCPF: sale.client.cpf,
          userName: sale.user.name,
          userId: sale.user.id,
          formPayment: sale.formPayment.formPayment,
          canceled: sale.canceled,
          canceled_at: sale.canceled ? sale.updated_at : undefined,
        });
        return sale.id;
      });

      const products = await this.salesRepository.FindBySaleIdSSalesProducts(
        salesIds,
      );

      products.forEach(async product => {
        const retu = ret.find(ret => ret.saleId === product.saleId);
        const index = ret.findIndex(ret => ret.saleId === product.saleId);
        if (retu) {
          const profit =
            product.qntd * product.price -
            product.qntd * product.paidPriceForItem;

          retu.profit = profit;
          ret[index] = retu;
        }
      });
    }

    return ret;
  }
}

export default SalesReportService;
