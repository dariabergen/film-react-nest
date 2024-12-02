//TODO описать DTO для запросов к /films
import {
    IsFQDN,
    IsNotEmpty,
    IsString,
    IsNumber,
    IsDate,
  } from 'class-validator';
  
  export class GetScheduleDto {
    id: string;
    daytime: string;
    hall: number;
    rows: number;
    seats: number;
    price: number;
    taken: string[];
  }
  
  export class GetFilmDto {
    id: string;
    rating: number;
    director: string;
    tags: string[];
    title: string;
    about: string;
    description: string;
    image: string;
    cover: string;
    schedule: GetScheduleDto[];
  }
  
  export class CreateScheduleDto {
    @IsDate()
    daytime: string;
    @IsNumber()
    hall: number;
    @IsNumber()
    rows: number;
    @IsNumber()
    seats: number;
    @IsNumber()
    price: number;
    taken: string[];
  }
  export class CreateFilmDto {
    @IsNumber()
    readonly rating: number;
    @IsString()
    readonly director: string;
    readonly tags: string[];
    @IsFQDN()
    readonly image: string;
    @IsFQDN()
    readonly cover: string;
    @IsString()
    readonly title: string;
    @IsString()
    readonly about: string;
    @IsString()
    readonly description: string;
    @IsNotEmpty()
    readonly schedule: string[];
  }