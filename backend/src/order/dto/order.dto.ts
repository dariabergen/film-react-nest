import { IsString, IsNumber } from 'class-validator';

class GetTicketDto {
  @IsString()
  film: string;
  @IsString()
  session: string;
  @IsString()
  daytime: string;
  @IsString()
  day: string;
  @IsString()
  time: string;
  @IsNumber()
  row: number;
  @IsNumber()
  seat: number;
  @IsNumber()
  price: number;
}

class PlaceTicketDto {
  @IsString()
  filmId: string;
  @IsString()
  sessionId: string;
  @IsString()
  seatsSelection: string;
}

class ContactsDto {
  @IsString()
  email: string;
  @IsString()
  phone: string;
}

export class CreateOrderDto extends ContactsDto {
  tickets: GetTicketDto[];

  public get getOrderData() {
    const request: PlaceTicketDto[] = [];
    this.tickets.forEach((ticket) => {
      const order = {} as PlaceTicketDto;
      order.filmId = ticket.film;
      order.sessionId = ticket.session;
      order.seatsSelection = `${ticket.row}:${ticket.seat}`;
      request.push(order);
    });
    return request;
  }
}