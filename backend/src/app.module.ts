// src/app.module.ts
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import * as path from 'node:path';
import { ConfigProvider } from './app.config.provider';
import { DbModule } from './database/dbase.module';
import { MovieProvider } from './films/films.provider';
import { MovieRepository } from './repository/films.repository';
import { MovieController } from './films/films.controller';
import { OrderController } from './order/order.controller';
import { FilmsService } from './films/films.service';
import { OrderService } from './order/order.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public'),
      renderPath: '/content/afisha/',
    }),
    DbModule,
  ],
  controllers: [MovieController, OrderController],
  providers: [
    ConfigProvider,
    MovieProvider,
    MovieRepository,
    FilmsService,
    OrderService,
  ],
})
export class AppModule {}