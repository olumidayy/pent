import { User } from '@prisma/client';
import express from 'express';
import UserService from './users.service';
import { ApiResponse } from '../../common';
import Logger from '../../common/logger';

const usersRouter = express.Router();

export default (app: express.Router) => {
  app.use('/users', usersRouter);

  usersRouter.get('/', async (req, res, next) => {
    try {
      Logger.info('Users route was called to get all users.');
      const users: User[] = await UserService.getAll();
      res.status(200).json(
        new ApiResponse({
          success: true,
          message: 'Users fetched.',
          code: 200,
          data: users,
        }),
      );
    } catch (error) {
      next(error);
    }
  });

  usersRouter.get('/:id', async (req, res, next) => {
    try {
      Logger.info(`Users route was called to get user by ID: ${req.params.id}`);
      const user = await UserService.getById(Number(req.params.id));
      res.status(200).json(
        new ApiResponse({
          success: true,
          message: 'User fetched.',
          code: 200,
          data: user,
        }),
      );
    } catch (error) {
      next(error);
    }
  });

  usersRouter.delete('/:id', async (req, res, next) => {
    try {
      Logger.info(`Users route was called to delete user: ${req.params.id}`);
      await UserService.delete(Number(req.params.id));
      res.status(200).json(
        new ApiResponse({
          success: true,
          message: 'User deleted.',
          code: 200,
        }),
      );
    } catch (error) {
      next(error);
    }
  });
};
