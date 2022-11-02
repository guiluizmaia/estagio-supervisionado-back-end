
import CryptHash from '../../../infra/utils/CryptHash/CryptHash';
import ICryptHash from '../../../infra/utils/CryptHash/ICryptHash';
import INumeric from '../../../infra/utils/Numerics/INumeric';
import Numeric from '../../../infra/utils/Numerics/Numeric';
import { DependencyContainer } from 'tsyringe';

class DataGeneratorUtils {
  static Configure(container: DependencyContainer): void {
    container
      .registerSingleton<ICryptHash>('CryptHash', CryptHash)
      .registerSingleton<INumeric>('Numeric', Numeric);
  }
}

export default DataGeneratorUtils;
