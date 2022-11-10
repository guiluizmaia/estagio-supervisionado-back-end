import 'express-async-errors';
import * as express from 'express';
import { Express, Request, Response, NextFunction } from 'express'
import * as http from 'http';
import { Server } from 'http';

import * as cors from 'cors';
import { errors } from 'celebrate';
import AppError from './errors/AppError';
import appRoutes from './routes';

class App {
  private app: Express;
  public server: Server;

  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);

    this.middlewares();
    this.routes();
    this.handleParseErrors();
    this.error();
  }

  private middlewares() {
    this.app.use(express.json());
    this.app.use(
      cors({
        origin: '*',
      }),
    );
  }

  private error() {
    this.app.use(
      (
        err: Error,
        request: Request,
        response: Response,
        next: NextFunction,
      ) => {
        if (err instanceof AppError) {
          return response.status(err.status_code).json({
            message: err.message,
          });
        }

        return response.status(500).json({
          status: 'error',
          messsage: `Internal server error: ${err.message}`,
        });
      },
    );
  }

  private handleParseErrors() {
    this.app.use(
      errors({
        statusCode: 422,
      }),
    );
  }

  private routes() {
    this.app.use(appRoutes);
  }
}

export default App;