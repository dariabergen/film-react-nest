import mongoose from 'mongoose';
import { AppConfig } from '../app.config.provider';

export const DatabaseProvider = {
  provide: 'DB_CONNECT',
  useFactory: async (config: AppConfig) => {
    return await mongoose.connect(config.database.url);
  },
  inject: ['CONFIG'],
};