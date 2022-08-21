import { Application } from 'express';
import Logger from '../common/logger';
import expressLoader from './express';

export default async ({ expressApp }: { expressApp: Application }) => {
  await expressLoader({ app: expressApp });
  Logger.info('- Express loaded');
};
