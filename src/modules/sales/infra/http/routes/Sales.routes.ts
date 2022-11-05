import { Router } from "express";
import SalesController from "../controller/SalesController";
import SalesReportController from "../controller/SalesReportController";

const salesRoutes = Router();

const salesController = new SalesController();
const salesReportController = new SalesReportController();

salesRoutes.post('/', salesController.create);
salesRoutes.patch('/', salesController.update);
salesRoutes.get('/', salesController.index);
salesRoutes.get('/report', salesReportController.get);
salesRoutes.get('/client/:id', salesController.findByClientId);
salesRoutes.get('/payment/:id', salesController.findByPaymentId);
salesRoutes.get('/user/:id', salesController.findByUserId);
salesRoutes.get('/:id', salesController.findById);
salesRoutes.delete('/:id', salesController.delete);

export default salesRoutes;
