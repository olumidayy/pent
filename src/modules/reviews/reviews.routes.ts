import { Review } from '@prisma/client';
import express from 'express';
import ReviewService from './reviews.service';
import { ApiResponse } from '../../common';
import Logger from '../../common/logger';
import { NewReviewValidator, UpdateReviewValidator } from './reviews.validators';
import attachUserData from '../auth/utils';

const ReviewsRouter = express.Router();

export default (app: express.Router) => {
  app.use('/Reviews', ReviewsRouter);

  ReviewsRouter.post(
    '/',
    attachUserData,
    NewReviewValidator,
    async (req, res, next) => {
      try {
        Logger.info(`Reviews route was called to create new review: ${JSON.stringify(req.body)}.`);
        const review: Review = await ReviewService.create(req.body);
        res.status(200).json(
          new ApiResponse({
            success: true,
            message: 'Review created.',
            code: 200,
            data: review,
          }),
        );
      } catch (error) {
        next(error);
      }
    },
  );

  ReviewsRouter.get(
    '/',
    async (req, res, next) => {
      try {
        Logger.info('Reviews route was called to get all Reviews.');
        const reviews: Review[] = await ReviewService.getAll();
        res.status(200).json(
          new ApiResponse({
            success: true,
            message: 'Reviews fetched.',
            code: 200,
            data: reviews,
          }),
        );
      } catch (error) {
        next(error);
      }
    },
  );

  ReviewsRouter.get(
    '/:id',
    async (req, res, next) => {
      try {
        Logger.info(`Reviews route was called to get Review by ID: ${req.params.id}`);
        const review: Review = await ReviewService.getById(Number(req.params.id));
        res.status(200).json(
          new ApiResponse({
            success: true,
            message: 'Review fetched.',
            code: 200,
            data: review,
          }),
        );
      } catch (error) {
        next(error);
      }
    },
  );

  ReviewsRouter.patch(
    '/:id',
    UpdateReviewValidator,
    attachUserData,
    async (req, res, next) => {
      try {
        Logger.info(`Reviews route was called to update Review: ${req.body}.`);
        const review: Review = await ReviewService.update(
          Number(req.params.id),
          req.body,
        );
        res.status(200).json(
          new ApiResponse({
            success: true,
            message: 'Review updated.',
            code: 200,
            data: review,
          }),
        );
      } catch (error) {
        next(error);
      }
    },
  );

  ReviewsRouter.patch(
    '/:id/vote',
    attachUserData,
    async (req, res, next) => {
      try {
        Logger.info(`Reviews route was called to update Review: ${req.body}.`);
        const review: Review = await ReviewService.vote(
          Number(req.params.id),
        );
        res.status(200).json(
          new ApiResponse({
            success: true,
            message: 'Vote added.',
            code: 200,
            data: review,
          }),
        );
      } catch (error) {
        next(error);
      }
    },
  );

  ReviewsRouter.delete(
    '/:id',
    attachUserData,
    async (req, res, next) => {
      try {
        Logger.info(`Reviews route was called to delete Review: ${req.params.id}`);
        await ReviewService.delete(Number(req.params.id));
        res.status(200).json(
          new ApiResponse({
            success: true,
            message: 'Review deleted.',
            code: 200,
          }),
        );
      } catch (error) {
        next(error);
      }
    },
  );
};
