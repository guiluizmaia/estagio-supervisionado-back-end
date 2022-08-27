import { Router, Request, Response } from 'express';

import UserController from '../controller/UserController';

const userRoutes = Router();

const userController = new UserController();

userRoutes.post('/', userController.create);
userRoutes.patch('/', userController.update);
userRoutes.get('/', userController.index);
userRoutes.get('/find', userController.find);
userRoutes.delete('/:id', userController.delete);

export default userRoutes;
