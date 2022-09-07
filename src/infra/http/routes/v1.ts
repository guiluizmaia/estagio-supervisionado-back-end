import { Request, Response, Router } from 'express';
import clientsRoutes from 'src/modules/clients/infra/http/routes/Clients.routes';
import permissionRoutes from 'src/modules/users/infra/http/routes/Permission.routes';
import userRoutes from 'src/modules/users/infra/http/routes/User.routes';
import authenticateRoutes from '../../../modules/users/infra/http/routes/Authenticate.routes';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const v1Routes = Router();

v1Routes.use('/login', authenticateRoutes);
v1Routes.use('/user', ensureAuthenticated, userRoutes)
v1Routes.use('/clients', ensureAuthenticated, clientsRoutes)
v1Routes.use('/permissions', ensureAuthenticated, permissionRoutes)

export default v1Routes;
