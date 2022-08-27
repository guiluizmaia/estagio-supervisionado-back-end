import { Router, Request, Response } from 'express';
import PermissionController from '../controller/PermissionController';


const permissionRoutes = Router();

const permissionController = new PermissionController();

permissionRoutes.get('/', permissionController.index);

export default permissionRoutes;
