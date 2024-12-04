import { Injectable, Inject } from '@nestjs/common';
import { AppConfig } from 'src/app.config.provider';
import { FilmsRepositoryMongo } from '../repository/filmsMongo.repository';
import { FilmsRepositoryPostgres } from '../repository/filmsPostgres.repository';


@Injectable()
export class FilmsService {
  constructor(
    @Inject('CONFIG') private readonly config: AppConfig,
    private readonly filmDatabaseMongo: FilmsRepositoryMongo,
    private readonly filmDatabasePostgres: FilmsRepositoryPostgres,
  ) {}

  async findAll() {
    if (this.config.database.driver === 'mongodb') {
      return this.filmDatabaseMongo.findAllFilms();
    } else if (this.config.database.driver === 'postgres') {
      return this.filmDatabasePostgres.findAllFilms();
    }
  }

  async findById(id: string) {
    if (this.config.database.driver === 'mongodb') {
      return this.filmDatabaseMongo.findFilmById(id);
    } else if (this.config.database.driver === 'postgres') {
      return this.filmDatabasePostgres.findFilmById(id);
    }
  }
}