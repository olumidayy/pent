import { celebrate, Joi } from 'celebrate';

export const RegisterValidator = celebrate(
  {
    body: {
      email: Joi.string().required().email(),
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      password: Joi.string().required().pattern(/^[a-zA-Z0-9]{3,30}$/),
    },
  },
  { stripUnknown: true },
);

export const LoginValidator = celebrate(
  {
    body: {
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
  },
  { stripUnknown: true },
);
