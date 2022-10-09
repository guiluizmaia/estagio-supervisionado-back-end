import { Router } from "express";
import FormPaymentController from "../controller/FormPaymentController";

const formPaymentRoutes = Router();

const formPaymentController = new FormPaymentController();

formPaymentRoutes.post('/', formPaymentController.create);
formPaymentRoutes.patch('/', formPaymentController.update);
formPaymentRoutes.get('/', formPaymentController.index);
formPaymentRoutes.get('/:id', formPaymentController.findById);
formPaymentRoutes.delete('/:id', formPaymentController.delete);

export default formPaymentRoutes;
