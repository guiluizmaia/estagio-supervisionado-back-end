import { Router, Request, Response } from 'express';

import ProductController from '../controller/ProductController';
import ProductReportController from '../controller/ProductReportController';

const productRoutes = Router();

const productController = new ProductController();
const productReportController = new ProductReportController();

productRoutes.post('/', productController.create);
productRoutes.patch('/', productController.update);
productRoutes.post('/input', productController.input);
productRoutes.get('/input', productController.indexInput);
productRoutes.get('/input/:id', productController.findByIdInput);
productRoutes.get('/report', productReportController.get);
productRoutes.get('/', productController.index);
productRoutes.delete('/:id', productController.delete);
productRoutes.get('/:id', productController.findById);


export default productRoutes;
