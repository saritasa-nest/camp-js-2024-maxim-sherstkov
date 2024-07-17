import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Anime } from '@js-camp/core/models/anime';

import { AnimeDto } from '@js-camp/core/dtos/anime.dto';

import { map, Observable } from 'rxjs';

import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';

import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';

import { AppConfig } from './app-config';

/** Anime service for getting anime list from API.
 * @param appConfig Config to provide environment variables.
 * @param http HttpClient.
 */
@Injectable({
	providedIn: 'root',
})
export class AnimeService {
	private readonly animeListUrl = `${this.appConfig.apiUrl}/anime/anime/`;

	public constructor(private readonly appConfig: AppConfig, private readonly http: HttpClient) { }

	/**
	 * Get a list of anime from the API.
	 *
	 * @returns Observable for AnimeList.
	 */
	public getAnimeList(): Observable<Anime[]> {
		return this.http.get<PaginationDto<AnimeDto>>(this.animeListUrl).pipe(
			map(animeDto => animeDto.results.map(anime => AnimeMapper.fromDto(anime))),
		);
	}
}
