import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Anime } from '@js-camp/core/models/anime';

import { AnimeDto } from '@js-camp/core/dtos/anime.dto';

import { map, Observable } from 'rxjs';

import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';

import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';

import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';

import { ApiUrlService } from './api-url.service';

/**
 * Anime service to interact with the API.
 */
@Injectable({
	providedIn: 'root',
})
export class AnimeService {
	private readonly http = inject(HttpClient);

	private readonly urlService = inject(ApiUrlService);

	/** Get http params.
	 * @param page Current page index.
	 * @param itemsPerPage Count items on a page.
	 */
	public getHttpParams(page: number, itemsPerPage: number): HttpParams {

		return new HttpParams()
			.set('offset', page.toString())
			.set('limit', itemsPerPage.toString());
	}

	/**
	 * Get a list of anime from the API.
	 */
	public getAnimeList(): Observable<Anime[]> {
		const params = this.getHttpParams(30, 15);
		return this.http.get<PaginationDto<AnimeDto>>(this.urlService.animeListPath, { params }).pipe(
			map(pagination => PaginationMapper.fromDto(
				pagination,
			).results.map(anime => AnimeMapper.fromDto(anime))),
		);

	}
}
