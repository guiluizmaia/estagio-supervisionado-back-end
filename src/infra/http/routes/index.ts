import { Router } from 'express';
import v1Routes from './v1';

const appRoutes = Router();

appRoutes.get('/health-check', async (req, res) => {
    return res.status(200).json({
      success: {
        type: 'SUCCESS_REQUEST',
        server: 'Is online',
        message: 'The application is healthy.',
      },
    });
});

appRoutes.use(v1Routes);

appRoutes.all('*/*', (req, res) => {
  return res.status(404).json({
    error: {
      errorType: 'RESOURCE_NOT_FOUND',
      message: `Cannot found resource ${req.method} ${req.path}`,
    },
  });
});

export default appRoutes;
