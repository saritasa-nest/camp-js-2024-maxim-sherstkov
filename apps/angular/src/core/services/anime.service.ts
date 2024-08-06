import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Anime } from '@js-camp/core/models/anime';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { map, Observable } from 'rxjs';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { Pagination } from '@js-camp/core/models/pagination';
import { AnimeParamsMapper } from '@js-camp/core/mappers/anime-params.mapper';
import { AnimeQuery } from '@js-camp/core/models/anime-query';

import { toHttpParams } from '../utils/http-helpers';

import { ApiUrlService } from './api-url.service';

/**
 * Anime service to interact with the API.
 */
@Injectable({
	providedIn: 'root',
})
export class AnimeService {
	private readonly http = inject(HttpClient);

	private readonly apiUrlService = inject(ApiUrlService);

	/**
	 * Get a list of anime from the API.
	 *
	 * @param params Anime query parameters.
	 */
	public getAnimeList(params: AnimeQuery): Observable<Pagination<Anime>> {
		const animeParams = { ...AnimeParamsMapper.toDto(params) };
		const httpParams = toHttpParams(animeParams);

		return this.http.get<PaginationDto<AnimeDto>>(this.apiUrlService.animeListPath, { params: httpParams }).pipe(
			map(pagination => PaginationMapper.fromDto(
				pagination,
				animeDto => AnimeMapper.fromDto(animeDto),
			)),
		);
	}
}
