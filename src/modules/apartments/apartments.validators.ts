import { celebrate, Joi } from 'celebrate';

export const CreateApartment =  celebrate(
  {
    body: {
      description: Joi.string().required(),
      location: Joi.string().required(),
    },
  },
  { stripUnknown: true },
);

export const UpdateApartment = celebrate(
  {
    body: {
      description: Joi.string(),
      location: Joi.string(),
    },
  },
  { stripUnknown: true },
);