import { Router } from "express";
import SalesController from "../controller/SalesController";

const salesRoutes = Router();

const salesController = new SalesController();

salesRoutes.post('/', salesController.create);
salesRoutes.patch('/', salesController.update);
salesRoutes.get('/', salesController.index);
salesRoutes.get('/client/:id', salesController.findByClientId);
salesRoutes.get('/payment/:id', salesController.findByPaymentId);
salesRoutes.get('/user/:id', salesController.findByUserId);
salesRoutes.get('/:id', salesController.findById);
salesRoutes.delete('/:id', salesController.delete);

export default salesRoutes;
