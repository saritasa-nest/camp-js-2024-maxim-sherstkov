import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSelectChange } from '@angular/material/select';
import { Sort } from '@angular/material/sort';
import { AnimeQuery } from '@js-camp/core/models/anime-query';
import { BehaviorSubject, take, map, Observable } from 'rxjs';

import { QueryParamsService } from './query-params.service';

/**
 * Page anime parameters service.
 */
@Injectable({
	providedIn: 'root',
})
export class PageAnimeParamsService {

	private readonly destroyRef = inject(DestroyRef);

	private readonly queryParamsService = inject(QueryParamsService);

	/** Anime parameters subject. */
	private readonly _animeParams$ = new BehaviorSubject(new AnimeQuery());

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
			const animeQueryParams = new AnimeQuery(updatedParams);
			this._animeParams$.next(animeQueryParams);
			this.queryParamsService.changeQueryParams(animeQueryParams);
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
	 *
	 * NOTE: This method constructs a `sort` string that indicates the field and direction for sorting.
	 * The sorting directive containing the field to sort by (`active`)	and the direction (`asc` or `desc`).
	 *
	 * @param sortValue SortValue Sort value parameter.
	 */
	public changeSortParams(sortValue: Sort): void {
		this.changeAnimeParams({ sort: sortValue });
	}

	/**
	 * Updates the filter parameters and resets the page index to the default value.
	 * @param filterValue The new filter value.
	 */
	public changeFilterParams(filterValue: MatSelectChange): void {
		this.changeAnimeParams({ filterByType: filterValue.value, pageIndex: AnimeQuery.DEFAULT_VALUES.pageIndex });
	}

	/**
	 * Returns an Observable of the current AnimeQuery parameters.
	 */
	public getAnimeParams(): Observable<AnimeQuery> {
		return this._animeParams$.asObservable();
	}
}
