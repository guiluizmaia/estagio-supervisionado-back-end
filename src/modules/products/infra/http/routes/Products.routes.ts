import { Router, Request, Response } from 'express';

import ProductController from '../controller/ProductController';

const productRoutes = Router();

const productController = new ProductController();

productRoutes.post('/', productController.create);
productRoutes.patch('/', productController.update);
productRoutes.post('/input', productController.input);
productRoutes.get('/', productController.index);
productRoutes.delete('/:id', productController.delete);
productRoutes.get('/:id', productController.findById);


export default productRoutes;
