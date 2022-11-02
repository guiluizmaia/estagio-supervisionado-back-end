import { Request, Response, Router } from 'express';
import clientsRoutes from '../../../modules/clients/infra/http/routes/Clients.routes';
import productRoutes from '../../../modules/products/infra/http/routes/Products.routes';
import providerRoutes from '../../../modules/providers/infra/http/routes/Provider.routes';
import formPaymentRoutes from '../../../modules/sales/infra/http/routes/FormPayment.routes';
import salesRoutes from '../../../modules/sales/infra/http/routes/Sales.routes';
import permissionRoutes from '../../../modules/users/infra/http/routes/Permission.routes';
import userRoutes from '../../../modules/users/infra/http/routes/User.routes';
import authenticateRoutes from '../../../modules/users/infra/http/routes/Authenticate.routes';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const v1Routes = Router();

v1Routes.use('/login', authenticateRoutes);
v1Routes.use('/user', ensureAuthenticated, userRoutes)
v1Routes.use('/clients', ensureAuthenticated, clientsRoutes)
v1Routes.use('/permissions', ensureAuthenticated, permissionRoutes)
v1Routes.use('/products', ensureAuthenticated, productRoutes)
v1Routes.use('/providers', ensureAuthenticated, providerRoutes)
v1Routes.use('/form-payments', ensureAuthenticated, formPaymentRoutes)
v1Routes.use('/sales', ensureAuthenticated, salesRoutes)


export default v1Routes;
