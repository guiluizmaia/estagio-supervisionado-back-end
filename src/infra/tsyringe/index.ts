import { container } from 'tsyringe';
import ClientModules from './modules/ClientModules';
import ProductModules from './modules/ProductModules';
import ProviderModules from './modules/ProviderModules';
import UserModules from './modules/UserModules';
import DataGeneratorUtils from './utils/DataGeneratorUtils';

UserModules.Configure(container);
ClientModules.Configure(container);
DataGeneratorUtils.Configure(container);
ProductModules.Configure(container);
ProviderModules.Configure(container);

