import { Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { GetFilmDto } from '../films/dto/films.dto';
import { Film } from '../films/schemas/film.schema';
import { SessionDoesNotExistException } from 'src/exceptions/sessionDoesNotExistException';
import { FilmDoesNotExistException } from 'src/exceptions/filmDoesNotExistException';

export class MovieRepository {
  constructor(@Inject('FILM_DB') private filmModel: Model<Film>) {}

  private getFilmMapperFn(): (filmFromDB: Film) => GetFilmDto {
    return (root) => {
      return {
        id: root.id,
        rating: root.rating,
        director: root.director,
        tags: root.tags,
        title: root.title,
        about: root.about,
        description: root.description,
        image: root.image,
        cover: root.cover,
        schedule: root.schedule,
      };
    };
  }

  async findAllFilms(): Promise<{ total: number; items: GetFilmDto[] }> {
    const films = await this.filmModel.find({});
    const total = await this.filmModel.countDocuments({});
    return {
      total,
      items: films.map(this.getFilmMapperFn()),
    };
  }

  async getFilmById(filmId: string): Promise<GetFilmDto> {
    try {
      const film = await this.filmModel.findOne({ id: filmId });
      return film;
    } catch (error) {
      throw new FilmDoesNotExistException(filmId);
    }
  }

  async getSessionData(filmId: string, sessionId: string): Promise<string[]> {
    try {
      const film = await this.filmModel.findOne({ id: filmId });
      const sessionIndex = film.schedule.findIndex((session) => {
        return session.id === sessionId;
      });
      return film.schedule[sessionIndex].taken;
    } catch (error) {
      throw new SessionDoesNotExistException(sessionId);
    }
  }

  async reserveSeat(
    filmId: string,
    sessionId: string,
    seats: string,
  ): Promise<string[]> {
    const film = await this.filmModel.findOne({ id: filmId });
    const sessionIndex = film.schedule.findIndex((session) => {
      return session.id === sessionId;
    });
    try {
      await this.filmModel.updateOne(
        { id: filmId },
        { $push: { [`schedule.${sessionIndex.toString()}.taken`]: seats } },
      );
      return;
    } catch (error) {
      new Error('неизвестная ошибка заказа');
    }
  }
}
