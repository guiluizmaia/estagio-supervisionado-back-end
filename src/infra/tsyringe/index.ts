import { container } from 'tsyringe';
import UserModules from './modules/UserModules';
import DataGeneratorUtils from './utils/DataGeneratorUtils';

UserModules.Configure(container);
DataGeneratorUtils.Configure(container);
