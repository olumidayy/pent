import { celebrate, Joi } from 'celebrate';

export const NewReviewValidator = celebrate(
  {
    body: {
      apartmentId: Joi.number().required(),
      userId: Joi.number(),
      description: Joi.string().required(),
      landlord: Joi.number().min(1).max(5),
      environment: Joi.number().min(1).max(5),
      quality: Joi.number().min(1).max(5),
    },
  },
  { stripUnknown: true },
);

export const UpdateReviewValidator = celebrate(
  {
    body: {
      description: Joi.string().required(),
    },
  },
  { stripUnknown: true },
);
