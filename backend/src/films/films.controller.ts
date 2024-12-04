import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { FilmsService } from './films.service';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsDatabase: FilmsService) {}

  @Get()
  getFilms() {
    return this.filmsDatabase.findAll();
  }

  @Get(':id/schedule')
  getFilmShedule(@Param('id') id: string) {
    return this.filmsDatabase.findById(id);
  }
}