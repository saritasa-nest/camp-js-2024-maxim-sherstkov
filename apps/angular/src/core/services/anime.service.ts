import { inject, Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Anime } from '@js-camp/core/models/anime';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { BehaviorSubject, combineLatest, map, Observable, switchMap, tap } from 'rxjs';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';

import { Pagination } from '@js-camp/core/models/pagination';

import { ApiUrlService } from './api-url.service';

type TPaginationParams = Readonly<{

	// TODO make comment clear
	/** The number of elements that can be on a page. */
	limit: Number;

	/** The number of items we need to skip in the request.  */
	offset: Number;
}>;

const DEFAULT_PAGINATION_PARAMS: TPaginationParams = {
	limit: 15,
	offset: 0,
};

/**
 * Anime service to interact with the API.
 */
@Injectable({
	providedIn: 'root',
})
export class AnimeService {
	private readonly http = inject(HttpClient);

	private readonly apiUrlService = inject(ApiUrlService);

	/** Pagination-related parameters. */
	private paginationParams$ = new BehaviorSubject({
		limit: DEFAULT_PAGINATION_PARAMS.limit,
		offset: DEFAULT_PAGINATION_PARAMS.offset,
	});

	/**
	 * Get a list of anime from the API.
	 * @param params Query parameters for a request.
	 */
	public getAnimeList(): Observable<Pagination<Anime>> {
		return this.paginationParams$.pipe(

			// TODO refactor params to new function
			switchMap(params => {
				const httpParams = new HttpParams()
					.set('limit', params.limit.toString())
					.set('offset', params.offset.toString());
				return this.http.get<PaginationDto<AnimeDto>>(this.apiUrlService.animeListPath, { params: httpParams }).pipe(
					map(pagination => PaginationMapper.fromDto(
						pagination,
						animeDto => AnimeMapper.fromDto(animeDto),
					)),
				);
			}),
		);
	}

	// }

	// TODO delete unused constructor, and make Destroy
	public constructor() {
		this.paginationParams$.subscribe(val => console.log(`BehaviorSubject value: ${JSON.stringify(val)}`));
	}

	/**
	 * Changes Subject of a pagination parameters.
	 *
	 * @public
	 * @param params Pagination parameters.
	 */
	public changePaginationParams(params: TPaginationParams): void {
		this.paginationParams$.next({
			limit: params.limit,
			offset: params.offset,
		});
	}
}
