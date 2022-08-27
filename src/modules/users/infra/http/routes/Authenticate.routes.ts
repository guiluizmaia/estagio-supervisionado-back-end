import { Router, Request, Response } from 'express';

import AuthenticateController from '../controller/AuthenticateController';

const authenticateRoutes = Router();

const authenticateController = new AuthenticateController();

authenticateRoutes.post('/', authenticateController.login);

export default authenticateRoutes;
