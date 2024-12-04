import { Repository } from 'typeorm';
import { Inject } from '@nestjs/common';
import { Film } from '../films/entities/film.entity';
import { FilmDoesNotExistException } from '../exceptions/filmDoesNotExistException';
import { SessionDoesNotExistException } from '../exceptions/sessionDoesNotExistException';
import { ServerErrorException } from '../exceptions/serverErrorException';

export class FilmsRepositoryPostgres {
  constructor(
    @Inject('FILM_DB')
    private filmsRepository: Repository<Film>,
  ) {}

  async findAllFilms(): Promise<{ total: number; items: Film[] }> {
    const [total, items] = await Promise.all([
      this.filmsRepository.count(),
      this.filmsRepository.find({ relations: { schedule: true } }),
    ]);

    return { total, items };
  }

  async findFilmById(filmId: string): Promise<Film> {
    try {
      return this.filmsRepository.findOne({
        where: { id: filmId },
        relations: { schedule: true },
      });
    } catch (error) {
      throw new FilmDoesNotExistException(filmId);
    }
  }

  async getSessionData(filmId: string, sessionId: string) {
    try {
      const film = await this.filmsRepository.findOne({
        where: { id: filmId },
        relations: { schedule: true },
      });
      const sessionIndex = film.schedule.findIndex((session) => {
        return session.id === sessionId;
      });
      return film.schedule[sessionIndex].taken;
    } catch (error) {
      throw new SessionDoesNotExistException(sessionId);
    }
  }

  async placeSeatsOrder(filmId: string, sessionId: string, seats: string) {
    const film = await this.filmsRepository.findOne({
      where: { id: filmId },
      relations: { schedule: true },
    });
    const sessionIndex = film.schedule.findIndex((session) => {
      return session.id === sessionId;
    });
    const previousData = film.schedule[sessionIndex].taken;
    const newData = previousData.concat(seats);
    film.schedule[sessionIndex].taken = newData;

    try {
      await this.filmsRepository.save(film);
      return;
    } catch (error) {
      new ServerErrorException('Неизвестная ошибка сервера');
    }
  }
}