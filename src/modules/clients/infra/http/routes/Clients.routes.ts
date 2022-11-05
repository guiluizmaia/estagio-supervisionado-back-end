import { Router, Request, Response } from 'express';

import ClientsController from '../controller/ClientsController';
import ClientsReportController from '../controller/ClientsReportController';

const clientsRoutes = Router();

const clientsController = new ClientsController();
const clientsReportController = new ClientsReportController();

clientsRoutes.post('/', clientsController.create);
clientsRoutes.patch('/', clientsController.update);
clientsRoutes.get('/', clientsController.index);
clientsRoutes.get('/report', clientsReportController.get);
clientsRoutes.get('/:cpf', clientsController.findByCpf);

export default clientsRoutes;
