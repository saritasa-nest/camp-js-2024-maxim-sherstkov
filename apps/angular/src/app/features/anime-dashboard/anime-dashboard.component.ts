import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, inject, OnInit, DestroyRef } from '@angular/core';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';
import { BasicProgressSpinnerComponent } from '@js-camp/angular/shared/components/basic-progress-spinner/basic-progress-spinner.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AnimeQuery } from '@js-camp/core/models/anime-query';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { AnimeType } from '@js-camp/core/models/anime-type';
import { MatButtonModule } from '@angular/material/button';
import { AnimeParamsMapper } from '@js-camp/core/mappers/anime-params.mapper';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PageAnimeParamsService } from '@js-camp/angular/core/services/page-anime-params.service';
import { Pagination } from '@js-camp/core/models/pagination';
import { Anime } from '@js-camp/core/models/anime';
import { Sort } from '@angular/material/sort';

import { AnimeTableComponent } from './components/anime-table/anime-table.component';

/** Anime list dashboard component. */
@Component({
	selector: 'camp-anime-dashboard',
	templateUrl: './anime-dashboard.component.html',
	styleUrls: ['./anime-dashboard.component.css'],
	standalone: true,
	imports: [
		CommonModule,
		AnimeTableComponent,
		MatPaginator,
		BasicProgressSpinnerComponent,
		MatFormFieldModule,
		MatInputModule,
		FormsModule,
		MatSelectModule,
		MatButtonModule,
		ReactiveFormsModule,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeDashboardComponent implements OnInit {
	private readonly animeService = inject(AnimeService);

	private readonly pageParamsService = inject(PageAnimeParamsService);

	private readonly destroyRef = inject(DestroyRef);

	/** Current route. */
	protected readonly route = inject(ActivatedRoute);

	/** Anime list. */
	protected readonly animeList$: Observable<Pagination<Anime>>;

	private readonly animeParams$ = this.pageParamsService.animeParams$;

	/** Current page index. */
	protected readonly currentPage$ = this.animeParams$.pipe(
		map(params => params.pageIndex),
	);

	/** Maximum number of items per page. */
	protected readonly pageSize$ = this.animeParams$.pipe(
		map(params => params.pageSize),
	);

	/** Current sort order. */
	protected readonly sort$ = this.animeParams$.pipe(
		map(params => params.sort),
	);

	/** Anime count. */
	protected readonly animeTotal$ = new BehaviorSubject(AnimeQuery.DEFAULT_VALUES.animeTotal);

	/** Anime type values. */
	protected readonly animeTypes = Object.values(AnimeType);

	/** Search input control. */
	protected readonly searchControl = new FormControl('');

	/** Filter input control. */
	protected readonly selectControl = new FormControl<AnimeType[]>([]);

	public constructor() {
		this.animeList$ = this.animeParams$.pipe(
			switchMap(params => this.animeService.getAnimeList(params)),
		);
	}

	/** @inheritdoc */
	public ngOnInit(): void {
		this.animeList$.pipe(
			takeUntilDestroyed(this.destroyRef),
		).subscribe(animeList => {
			this.animeTotal$.next(animeList.count);
		});

		this.initializeParamsFromUrl();
	}

	/**
	 * Handles paginator changes.
	 *
	 * @param pageEvent Event triggered by a paginator.
	 * */
	protected handlePageEvent(pageEvent: PageEvent): void {
		this.pageParamsService.changePaginationParams(new AnimeQuery({
			pageSize: pageEvent.pageSize,
			pageIndex: pageEvent.pageIndex,
		}));

	}

	/** Handles search form submit. */
	protected handleSearch(): void {
		this.pageParamsService.changeSearchParams(this.searchControl.value ?? AnimeQuery.DEFAULT_VALUES.searchValue);
	}

	/**
	 * Handles filter changes.
	 *
	 * @param selectValue Select element value.
	 */
	protected handleFilter(selectValue: MatSelectChange): void {
		this.pageParamsService.changeFilterParams(selectValue);
	}

	/**
	 * Handles sort changes.
	 * @param sort New sort value.
	 *  */
	protected handleSortChange(sort: Sort): void {
		this.pageParamsService.changeSortParams(sort);
	}

	private initializeParamsFromUrl(): void {
		const { pageSize, pageIndex, searchValue, sort } =
			AnimeParamsMapper.fromQueryParams({ ...this.route.snapshot.queryParams });

		/** Gets array of filterByType. */
		const filterFromQuery = this.route.snapshot.queryParamMap.getAll('filterByType');
		const selectedTypes = AnimeParamsMapper.toAnimeType(filterFromQuery);

		this.selectControl.setValue(selectedTypes);
		this.searchControl.setValue(searchValue);

		this.pageParamsService.changeAnimeParams({
			pageSize,
			pageIndex,
			searchValue,
			sort,
			filterByType: selectedTypes,
		});
	}
}
