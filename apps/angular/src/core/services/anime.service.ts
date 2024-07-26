import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Anime } from '@js-camp/core/models/anime';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';

import { Pagination } from '@js-camp/core/models/pagination';

import { ApiUrlService } from './api-url.service';
import { QueryParamsService } from './query-params.service';

type TPaginationParams = Readonly<{

	// TODO make comment clear
	/** The number of elements that can be on a page. */
	limit: number;

	/** The number of pages we need to skip in the request.  */
	page: number;
}>;

/**
 * Anime service to interact with the API.
 */
@Injectable({
	providedIn: 'root',
})
export class AnimeService {
	private readonly http = inject(HttpClient);

	private readonly apiUrlService = inject(ApiUrlService);

	private readonly queryParamsService = inject(QueryParamsService);

	/** Default pagination params. */
	public defaultPaginationParams: TPaginationParams = {
		limit: 15,
		page: 0,
	};

	/** Pagination-related parameters. */
	private paginationParams$: BehaviorSubject<TPaginationParams> = new BehaviorSubject({
		limit: this.defaultPaginationParams.limit,
		page: this.defaultPaginationParams.page,
	});

	/** Pagination parameters observable for monitoring them outside the service.  */
	public observablePaginationParams$ = this.paginationParams$.asObservable();

	/**
	 * Get a list of anime from the API.
	 * @param params Query parameters for a request.
	 */
	public getAnimeList(): Observable<Pagination<Anime>> {
		return this.paginationParams$.pipe(
			switchMap(params => {
				const httpParams = this.queryParamsService.getHttpParams(params);

				this.queryParamsService.changeQueryParams(params);
				return this.http.get<PaginationDto<AnimeDto>>(this.apiUrlService.animeListPath, { params: httpParams }).pipe(
					map(pagination => PaginationMapper.fromDto(
						pagination,
						animeDto => AnimeMapper.fromDto(animeDto),
					)),
				);
			}),
		);
	}

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
			page: params.page,
		});
	}
}
