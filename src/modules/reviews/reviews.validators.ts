import { celebrate, Joi } from 'celebrate';

export const NewReviewValidator = celebrate(
  {
    body: {
      apartmentId: Joi.number().required(),
      userId: Joi.number(),
      description: Joi.string().required().required(),
      landlord: Joi.number().min(1).max(5).required(),
      environment: Joi.number().min(1).max(5).required(),
      quality: Joi.number().min(1).max(5).required(),
      media: Joi.array().items(Joi.string()),
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
