import { Router, Request, Response } from 'express';

import ClientsController from '../controller/ClientsController';

const clientsRoutes = Router();

const clientsController = new ClientsController();

clientsRoutes.post('/', clientsController.create);
clientsRoutes.patch('/', clientsController.update);
clientsRoutes.get('/', clientsController.index);
clientsRoutes.get('/:cpf', clientsController.findByCpf);

export default clientsRoutes;
