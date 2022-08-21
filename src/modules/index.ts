import express from 'express';
import userRoutes from './users/users.routes';
import authRoutes from './auth/auth.routes';
import apartmentsRoutes from './apartments/apartments.routes';
import reviewsRoutes from './reviews/reviews.routes';

export default () => {
  const baseRouter = express.Router();
  apartmentsRoutes(baseRouter);
  authRoutes(baseRouter);
  reviewsRoutes(baseRouter);
  userRoutes(baseRouter);
  return baseRouter;
};
