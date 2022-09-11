
import CryptHash from 'src/infra/utils/CryptHash/CryptHash';
import ICryptHash from 'src/infra/utils/CryptHash/ICryptHash';
import INumeric from 'src/infra/utils/Numerics/INumeric';
import Numeric from 'src/infra/utils/Numerics/Numeric';
import { DependencyContainer } from 'tsyringe';

class DataGeneratorUtils {
  static Configure(container: DependencyContainer): void {
    container
      .registerSingleton<ICryptHash>('CryptHash', CryptHash)
      .registerSingleton<INumeric>('Numeric', Numeric);
  }
}

export default DataGeneratorUtils;
