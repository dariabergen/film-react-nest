import { HttpException, HttpStatus } from '@nestjs/common';

export class SessionDoesNotExistException extends HttpException {
  constructor(id: string) {
    super(`Сеанс с id ${id} не найден`, HttpStatus.BAD_REQUEST);
  }
}