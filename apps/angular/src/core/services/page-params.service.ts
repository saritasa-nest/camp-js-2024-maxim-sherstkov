import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSelectChange } from '@angular/material/select';
import { Sort } from '@angular/material/sort';
import { AnimeQuery } from '@js-camp/core/models/anime-query';
import { BehaviorSubject, take, map } from 'rxjs';

import { QueryParamsService } from './query-params.service';

/**
 * Page parameters service.
 */
@Injectable({
	providedIn: 'root',
})
export class PageParamsService {

	private readonly destroyRef = inject(DestroyRef);

	private readonly queryParamsService = inject(QueryParamsService);

	/** Anime parameters subject. */
	private readonly _animeParams$ = new BehaviorSubject(new AnimeQuery());

	/** Anime parameters observable for monitoring them outside the service. */
	public readonly animeParams$ = this._animeParams$.asObservable();

	/** Loading state subject. */
	private readonly _isLoading$ = new BehaviorSubject(false);

	/** Loading state observable for monitoring it outside the service. */
	public readonly isLoading$ = this._isLoading$.asObservable();

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
			this.queryParamsService.changeQueryParams(updatedParams);
		});
	}

	/**
	 * Changes Subject of a pagination parameters.
	 * @param paginationParams Pagination parameters.
	 */
	public changePaginationParams(paginationParams: AnimeQuery): void {
		this.changeAnimeParams({ pageIndex: paginationParams.pageIndex, pageSize: paginationParams.pageSize });
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
		let sortOrder = '';
		if (sortValue.direction === 'asc') {
			sortOrder = sortValue.active;
		}
		if (sortValue.direction === 'desc') {
			sortOrder = `-${sortValue.active}`;
		}
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
