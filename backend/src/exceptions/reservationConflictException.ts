import { HttpException, HttpStatus } from '@nestjs/common';

export class ReservationConflictException extends HttpException {
  constructor(seats: string) {
    const row = seats.split(':')[0];
    const seat = seats.split(':')[1];
    super(
      `Вы пытаетесь купить места, которые уже заняты: ряд ${row}, место ${seat}`,
      HttpStatus.BAD_REQUEST,
    );
  }
}