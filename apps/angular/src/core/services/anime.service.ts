import { inject, Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Anime } from '@js-camp/core/models/anime';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { BehaviorSubject, combineLatest, debounceTime, map, Observable, Subject, switchMap, take, takeUntil } from 'rxjs';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { Pagination } from '@js-camp/core/models/pagination';
import { AnimeParams } from '@js-camp/core/models/based-params';
import { ApiUrlService } from './api-url.service';
import { QueryParamsService } from './query-params.service';
import { Sort } from '@angular/material/sort';
import { MatSelectChange } from '@angular/material/select';

/**
 * Anime service to interact with the API.
 */
@Injectable({
	providedIn: 'root',
})
export class AnimeService implements OnDestroy {
	private readonly http = inject(HttpClient);
	private readonly apiUrlService = inject(ApiUrlService);
	private readonly queryParamsService = inject(QueryParamsService);

	/** Subject for managing unsubscribing. */
	private readonly destroy$ = new Subject<void>();

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
			debounceTime(500),
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
			takeUntil(this.destroy$)
		);
	}

	/**
	 * Changes the anime parameters.
	 * @param params Partial anime parameters.
	 */
	public changeAnimeParams(params: Partial<AnimeParams>): void {
		this.animeParams$.pipe(
			take(1),
			map(currentParams => ({ ...currentParams, ...params })),
			takeUntil(this.destroy$)
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
	 * Changes the search parameters.
	 * @param param Search value parameter.
	 */
	public changeSearchParams(searchValue: string): void {
		this.changeAnimeParams({ searchValue: searchValue, pageIndex: AnimeParams.defaultValues.pageIndex });
	}

	/**
	 * Changes the sort parameters.
	 * @sortValue sortValue Sort value parameter.
	 */
	public changeSortParams(sortValue: Sort): void {
		const sortOrder = !sortValue.active || sortValue.direction === 'asc' ? sortValue.active : `-${sortValue.active}`;
		this.changeAnimeParams({ sortOrder });			
	}

	public changeFilterParams(filterValue: MatSelectChange){
		this.changeAnimeParams({ filterByType: filterValue.value, pageIndex: AnimeParams.defaultValues.pageIndex });
	}
	
	/** @inheritdoc */
	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
