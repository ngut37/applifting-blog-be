import * as dotenv from 'dotenv';

dotenv.config();

export const config = Object.freeze({
  NODE_ENV: process.env.NODE_ENV || 'development',
  APP_PORT: process.env.APP_PORT || 8080,

  PG_HOST: process.env.PG_HOST,
  PG_PORT: parseInt(process.env.PG_PORT),
  PG_USER: process.env.PG_USER,
  PG_PASSWORD: process.env.PG_PASSWORD,
  PG_DATABASE: process.env.PG_DATABASE,

  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRATION: parseInt(process.env.JWT_EXPIRATION) || 3600,
});
