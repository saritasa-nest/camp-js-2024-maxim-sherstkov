import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Anime } from '@js-camp/core/models/anime';

import { AnimeDto } from '@js-camp/core/dtos/anime.dto';

import { map, Observable } from 'rxjs';

import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';

import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';

import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';

import { ApiUrlService, DEFAULT_PARAMS, TQueryParams } from './api-url.service';

/**
 * Anime service to interact with the API.
 */
@Injectable({
	providedIn: 'root',
})
export class AnimeService {
	private readonly http = inject(HttpClient);

	private readonly apiUrlService = inject(ApiUrlService);

	private testMsg: TQueryParams = DEFAULT_PARAMS;

	/**
	 * Get a list of anime from the API.
	 * @param params Params of the url.
	 */
	public getAnimeList(): Observable<Anime[]> {
		const params = this.apiUrlService.getParamsFunction();
		const foo = DEFAULT_PARAMS;
		this.apiUrlService.paginationParams$.subscribe(msg => {
			this.testMsg = msg;
		});
		return this.http.get<PaginationDto<AnimeDto>>(this.apiUrlService.animeListPath, { params }).pipe(
			map(pagination => PaginationMapper.fromDto(
				pagination,
			).results.map(anime => AnimeMapper.fromDto(anime))),
		);

	}
}
