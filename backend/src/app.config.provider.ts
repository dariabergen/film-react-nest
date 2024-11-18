import { ConfigModule } from '@nestjs/config';

export const ConfigProvider = {
  imports: [ConfigModule.forRoot()],
  provide: 'CONFIG',
  useValue: <AppConfig>{
    database: {
      url: process.env.DATABASE_URL,
      driver: process.env.DATABASE_DRIVER,
    },
  },
};

export interface AppConfig {
  database: AppConfigDatabase;
}

export interface AppConfigDatabase {
  driver: string;
  url: string;
}