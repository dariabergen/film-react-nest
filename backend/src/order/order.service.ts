import { Injectable, Inject } from '@nestjs/common';
import { CreateOrderDto } from './dto/order.dto';
import { ReservationConflictException } from '../exceptions/reservationConflictException';
import { AppConfig } from 'src/app.config.provider';
import { FilmsRepositoryMongo } from 'src/repository/filmsMongo.repository';
import { FilmsRepositoryPostgres } from 'src/repository/filmsPostgres.repository';

@Injectable()
export class OrderService {
  constructor(
    @Inject('CONFIG') private readonly config: AppConfig,
    private readonly filmDatabaseMongo: FilmsRepositoryMongo,
    private readonly filmDatabasePostgres: FilmsRepositoryPostgres,
  ) {}

  async placeOrder(orderData: CreateOrderDto): Promise<any> {
    const ticketsAvailableForPurchase = [];

    if (this.config.database.driver === 'mongodb') {
      for (const order of orderData.getOrderData) {
        const sessionData = await this.filmDatabaseMongo.getSessionData(
          order.filmId,
          order.sessionId,
        );
        if (sessionData.includes(order.seatsSelection)) {
          throw new ReservationConflictException(order.seatsSelection);
        }
        ticketsAvailableForPurchase.push({
          filmId: order.filmId,
          sessionId: order.sessionId,
          seatsSelection: order.seatsSelection,
        });
      }
      if (ticketsAvailableForPurchase.length > 0) {
        ticketsAvailableForPurchase.forEach((ticket) => {
          const { filmId, sessionId, seatsSelection } = ticket;
          this.filmDatabaseMongo.placeSeatsOrder(
            filmId,
            sessionId,
            seatsSelection,
          );
        });
      }
    } else if (this.config.database.driver === 'postgres') {
      for (const order of orderData.getOrderData) {
        const sessionData = await this.filmDatabasePostgres.getSessionData(
          order.filmId,
          order.sessionId,
        );
        if (sessionData.includes(order.seatsSelection)) {
          throw new ReservationConflictException(order.seatsSelection);
        }
        ticketsAvailableForPurchase.push({
          filmId: order.filmId,
          sessionId: order.sessionId,
          seatsSelection: order.seatsSelection,
        });
      }
      if (ticketsAvailableForPurchase.length > 0) {
        ticketsAvailableForPurchase.forEach((ticket) => {
          const { filmId, sessionId, seatsSelection } = ticket;
          this.filmDatabasePostgres.placeSeatsOrder(
            filmId,
            sessionId,
            seatsSelection,
          );
        });
      }
    }
    return orderData;
  }
}