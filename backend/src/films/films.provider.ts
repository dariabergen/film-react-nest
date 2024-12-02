import { FilmSchema } from './schemas/film.schema';

export const MovieProvider = {
  provide: 'FILM_DB',
  inject: ['DB_CONNECT', 'CONFIG'],
  useFactory: (connection) => connection.model('Film', FilmSchema),
};
