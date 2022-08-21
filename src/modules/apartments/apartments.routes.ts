import { Apartment } from '@prisma/client';
import express from 'express';
import ApartmentService from './apartments.service';
import { ApiResponse } from '../../common';
import Logger from '../../common/logger';
import ApartmentsValidator from './apartments.validators';

const apartmentsRouter = express.Router();

export default (app: express.Router) => {
  app.use('/apartments', apartmentsRouter);

  apartmentsRouter.post(
    '/',
    ApartmentsValidator,
    async (req, res, next) => {
      try {
        Logger.info(`Apartments route was called to create new apartment: ${req.body}.`);
        const apartment: Apartment = await ApartmentService.create(req.body);
        res.status(200).json(
          new ApiResponse({
            success: true,
            message: 'Apartment created.',
            code: 200,
            data: apartment,
          }),
        );
      } catch (error) {
        next(error);
      }
    },
  );

  apartmentsRouter.get('/', async (req, res, next) => {
    try {
      Logger.info('Apartments route was called to get all apartments.');
      const apartments: Apartment[] = await ApartmentService.getAll();
      res.status(200).json(
        new ApiResponse({
          success: true,
          message: 'Apartments fetched.',
          code: 200,
          data: apartments,
        }),
      );
    } catch (error) {
      next(error);
    }
  });

  apartmentsRouter.get('/:id', async (req, res, next) => {
    try {
      Logger.info(`Apartments route was called to get apartment by ID: ${req.params.id}`);
      const apartment: Apartment = await ApartmentService.getById(Number(req.params.id));
      res.status(200).json(
        new ApiResponse({
          success: true,
          message: 'Apartment fetched.',
          code: 200,
          data: apartment,
        }),
      );
    } catch (error) {
      next(error);
    }
  });

  apartmentsRouter.get('/:id/reviews', async (req, res, next) => {
    try {
      Logger.info(`Apartments route was called to get apartment reviews: ${req.params.id}`);
      const apartment: Apartment = await ApartmentService.getReviews(Number(req.params.id));
      res.status(200).json(
        new ApiResponse({
          success: true,
          message: 'Apartment fetched.',
          code: 200,
          data: apartment,
        }),
      );
    } catch (error) {
      next(error);
    }
  });

  apartmentsRouter.patch(
    '/:id',
    ApartmentsValidator,
    async (req, res, next) => {
      try {
        Logger.info(`Apartments route was called to update apartment: ${req.body}.`);
        const apartment: Apartment = await ApartmentService.update(
          Number(req.params.id),
          req.body,
        );
        res.status(200).json(
          new ApiResponse({
            success: true,
            message: 'Apartment created.',
            code: 200,
            data: apartment,
          }),
        );
      } catch (error) {
        next(error);
      }
    },
  );

  apartmentsRouter.delete(
    '/:id',
    async (req, res, next) => {
      try {
        Logger.info(`apartments route was called to delete apartment: ${req.params.id}`);
        await ApartmentService.delete(Number(req.params.id));
        res.status(200).json(
          new ApiResponse({
            success: true,
            message: 'apartment deleted.',
            code: 200,
          }),
        );
      } catch (error) {
        next(error);
      }
    },
  );
};
