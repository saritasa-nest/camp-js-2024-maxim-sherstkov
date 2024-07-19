import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Anime } from '@js-camp/core/models/anime';

import { AnimeDto } from '@js-camp/core/dtos/anime.dto';

import { map, Observable } from 'rxjs';

import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';

import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';

import { UrlService } from './url.service';

/** Anime service for getting anime list from API.
 * @param appConfig Config to provide environment variables.
 * @param http HttpClient.
 */
@Injectable({
	providedIn: 'root',
})
export class AnimeService {
	private readonly http = inject(HttpClient);

	private readonly urlService = inject(UrlService);

	/**
	 * Get a list of anime from the API.
	 *
	 * @returns Observable for AnimeList.
	 */
	public getAnimeList(): Observable<Anime[]> {
		return this.http.get<PaginationDto<AnimeDto>>(this.urlService.animeListPath).pipe(
			map(animeDto => animeDto.results.map(anime => AnimeMapper.fromDto(anime))),
		);
	}
}
