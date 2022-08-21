import { celebrate, Joi } from 'celebrate';

export default celebrate(
  {
    body: {
      description: Joi.string().required(),
      location: Joi.string().required(),
    },
  },
  { stripUnknown: true },
);
