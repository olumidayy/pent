import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

dotenv.config();

export default {
  port: process.env.PORT,

  databaseURL: process.env.DB_URL,

  saltRounds: process.env.SAlT_ROUNDS || 10,

  jwtSecret: process.env.JWT_SECRET || '',

  logs: {
    level: 'silly',
  },

  api: {
    prefix: '/api',
  },
};
