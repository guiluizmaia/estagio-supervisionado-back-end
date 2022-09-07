import { container } from 'tsyringe';
import ClientModules from './modules/ClientModules';
import UserModules from './modules/UserModules';
import DataGeneratorUtils from './utils/DataGeneratorUtils';

UserModules.Configure(container);
ClientModules.Configure(container);
DataGeneratorUtils.Configure(container);
