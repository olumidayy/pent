import express from 'express';
import AuthService from './auth.service';
import { ApiResponse } from '../../common';
import { LoginDTO } from './auth.interfaces';
import { LoginValidator, RegisterValidator } from './auth.validators';
import Logger from '../../common/logger';

const AuthRouter = express.Router();

export default (app: express.Router) => {
  app.use('/auth', AuthRouter);

  AuthRouter.post('/register', RegisterValidator, async (req, res, next) => {
    try {
      Logger.info(`Auth route was called to register user: ${req.body}`);
      await AuthService.Register(req.body);
      res.status(201).json(
        new ApiResponse({
          success: true,
          message: 'Registration successful.',
          code: 201,
        }),
      );
    } catch (error) {
      next(error);
    }
  });

  AuthRouter.post('/login', LoginValidator, async (req, res, next) => {
    try {
      Logger.info(`Auth route was called to login user: ${req.body}`);
      const result = await AuthService.Login(req.body as LoginDTO);
      res.status(200).json(
        new ApiResponse({
          success: true,
          message: 'Authentication successful.',
          code: 200,
          data: result,
        }),
      );
    } catch (error) {
      next(error);
    }
  });
};
