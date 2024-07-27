import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Anime } from '@js-camp/core/models/anime';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { BehaviorSubject, combineLatest, debounceTime, map, Observable, switchMap, take } from 'rxjs';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';

import { Pagination } from '@js-camp/core/models/pagination';

import { AnimeParams } from '@js-camp/core/models/based-params';

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

	/** Anime parameters subject. */
	private animeParams$: BehaviorSubject<AnimeParams> = new BehaviorSubject(new AnimeParams());

	/** Anime parameters observable for monitoring them outside the service. */
	public observableAnimeParams$ = this.animeParams$.asObservable();

	/**
	 * Get a list of anime from the API.
	 * @param params Query parameters for a request.
	 */
	public getAnimeList(): Observable<Pagination<Anime>> {
		return this.animeParams$.pipe(
			debounceTime(1000),
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

	/**
	 * Changes the anime parameters.
	 * @param params Partial anime parameters.
	 */
	public changeAnimeParams(params: Partial<AnimeParams>): void {
		this.animeParams$.pipe(
			take(1),
			map(currentParams => ({ ...currentParams, ...params })),
		).subscribe(updatedParams => {
			this.animeParams$.next(new AnimeParams(updatedParams));
		});
	}

	/**
	 * Changes Subject of a pagination parameters.
	 *
	 * @param params Pagination parameters.
	 */
	public changePaginationParams(params: AnimeParams): void {
		this.changeAnimeParams({ pageIndex: params.pageIndex, pageSize: params.pageSize });
	}

	/**
	 * Changes the search parameter.
	 * @param param Search value parameter.
	 */
	public changeSearchParam(param: string): void {
		this.changeAnimeParams({ searchValue: param, pageIndex: 0 });
	}
}
