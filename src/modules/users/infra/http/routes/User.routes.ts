import { Router, Request, Response } from 'express';

import UserController from '../controller/UserController';
import UserReportController from '../controller/UserReportController';

const userRoutes = Router();

const userController = new UserController();
const userReportController = new UserReportController();

userRoutes.post('/', userController.create);
userRoutes.patch('/', userController.update);
userRoutes.get('/', userController.index);
userRoutes.get('/find', userController.find);
userRoutes.get('/report', userReportController.get);
userRoutes.delete('/:id', userController.delete);

export default userRoutes;
