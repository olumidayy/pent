import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { isCelebrateError } from 'celebrate';
import routes from '../modules';
import config from '../config';
import { ApiError, ApiResponse } from '../common';
import Logger from '../common/logger';

export default ({ app }: { app: express.Application }) => {
  app.enable('trust proxy');
  app.use(cors());
  app.use(express.json());
  app.use(config.api.prefix, routes());

  app.get('/api', (req, res) => {
    res.status(200).json(new ApiResponse({
      success: true,
      message: "Welcome to Olumide's attempt at Pario Solutions' challenge.",
      code: 200,
    }));
  });

  // For handling 404 errors.
  app.use((req, res, next) => {
    const err = new ApiError({ message: 'That resource does not exist on this server.' });
    err.code = 404;
    next(err);
  });

  // For handling validation errors.
  // eslint-disable-next-line consistent-return
  app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
    if (isCelebrateError(err)) {
      let errors: any = err.details.get('body') || err.details.get('query') || err.details.get('params');
      errors = errors.details.map((x: any) => x.message);
      const message = errors.join(' | ');
      return res.status(400).json(
        new ApiResponse({
          success: false,
          code: 400,
          message,
        }),
      );
    }
    next(err);
  });

  // For handling server errors.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
    Logger.info(err);
    res.status(err.code || 500);
    res.json(
      new ApiResponse({
        success: false,
        code: err.code || 500,
        message: err.message,
      }),
    );
  });
};
