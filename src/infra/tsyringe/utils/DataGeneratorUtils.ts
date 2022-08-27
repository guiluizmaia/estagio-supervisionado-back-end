
import CryptHash from 'src/infra/utils/CryptHash/CryptHash';
import ICryptHash from 'src/infra/utils/CryptHash/ICryptHash';
import { DependencyContainer } from 'tsyringe';

class DataGeneratorUtils {
  static Configure(container: DependencyContainer): void {
    container
      .registerSingleton<ICryptHash>('CryptHash', CryptHash);
  }
}

export default DataGeneratorUtils;
