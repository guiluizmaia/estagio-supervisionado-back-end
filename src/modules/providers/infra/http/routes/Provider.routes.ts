import { Router, Request, Response } from 'express';

import ProviderController from '../controller/ProviderController';

const providerRoutes = Router();

const providerController = new ProviderController();

providerRoutes.post('/', providerController.create);
providerRoutes.patch('/', providerController.update);
providerRoutes.get('/', providerController.index);
providerRoutes.get('/:id', providerController.findById);


export default providerRoutes;
