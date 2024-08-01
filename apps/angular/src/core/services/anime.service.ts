import { DestroyRef, inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Anime } from '@js-camp/core/models/anime';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { BehaviorSubject, map, Observable, switchMap, take, tap } from 'rxjs';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { Pagination } from '@js-camp/core/models/pagination';
import { AnimeQuery } from '@js-camp/core/models/anime-query';
import { Sort } from '@angular/material/sort';
import { MatSelectChange } from '@angular/material/select';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AnimeParamsMapper } from '@js-camp/core/mappers/anime-params.mapper';

import { ApiUrlService } from './api-url.service';
import { QueryParamsService } from './query-params.service';

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

	private readonly destroyRef = inject(DestroyRef);

	/** Anime parameters subject. */
	private readonly _animeParams$ = new BehaviorSubject(new AnimeQuery());

	/** Anime parameters observable for monitoring them outside the service. */
	public readonly animeParams$ = this._animeParams$.asObservable();

	/** Loading state subject. */
	private readonly _isLoading$ = new BehaviorSubject(false);

	/** Loading state observable for monitoring it outside the service. */
	public readonly isLoading$ = this._isLoading$.asObservable();

	/** Get a list of anime from the API. */
	public getAnimeList(): Observable<Pagination<Anime>> {
		return this._animeParams$.pipe(
			takeUntilDestroyed(this.destroyRef),
			switchMap(params => {
				this._isLoading$.next(true);
				const httpParams = AnimeParamsMapper.toAnimeHttp(params);
				this.queryParamsService.changeQueryParams(params);
				return this.http.get<PaginationDto<AnimeDto>>(this.apiUrlService.animeListPath, { params: httpParams }).pipe(
					map(pagination => PaginationMapper.fromDto(
						pagination,
						animeDto => AnimeMapper.fromDto(animeDto),
					)),
					tap(() => this._isLoading$.next(false)),
				);
			}),
		);
	}

	/**
	 * Changes the anime parameters.
	 * @param params Partial anime parameters.
	 */
	public changeAnimeParams(params: Partial<AnimeQuery>): void {
		this._animeParams$.pipe(
			takeUntilDestroyed(this.destroyRef),
			take(1),
			map(currentParams => ({ ...currentParams, ...params })),
		).subscribe(updatedParams => {
			this._animeParams$.next(new AnimeQuery(updatedParams));
		});
	}

	/**
	 * Changes Subject of a pagination parameters.
	 * @param params Pagination parameters.
	 */
	public changePaginationParams(params: AnimeQuery): void {
		this.changeAnimeParams({ pageIndex: params.pageIndex, pageSize: params.pageSize });
	}

	/**
	 * Changes the search parameters.
	 * @param searchValue Search value parameter.
	 */
	public changeSearchParams(searchValue: string): void {
		this.changeAnimeParams({ searchValue, pageIndex: AnimeQuery.DEFAULT_VALUES.pageIndex });
	}

	/**
	 * Changes the sort parameters.
	 * @param sortValue SortValue Sort value parameter.
	 */
	public changeSortParams(sortValue: Sort): void {
		const sortOrder = !sortValue.active || sortValue.direction === 'asc' ? sortValue.active : `-${sortValue.active}`;
		this.changeAnimeParams({ sortOrder });
	}

	/**
	 * Updates the filter parameters and resets the page index to the default value.
	 * @param filterValue The new filter value.
	 */
	public changeFilterParams(filterValue: MatSelectChange): void {
		this.changeAnimeParams({ filterByType: filterValue.value, pageIndex: AnimeQuery.DEFAULT_VALUES.pageIndex });
	}
}
