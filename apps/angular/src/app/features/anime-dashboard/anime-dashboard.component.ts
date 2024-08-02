import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, inject, OnInit, DestroyRef } from '@angular/core';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';
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
import { PageParamsService } from '@js-camp/angular/core/services/page-params.service';

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

	private readonly pageParamsService = inject(PageParamsService);

	private readonly destroyRef = inject(DestroyRef);

	/** Current route. */
	protected readonly route: ActivatedRoute = inject(ActivatedRoute);

	/** Anime list. */
	protected readonly animeList$;

	/** Current page index. */
	protected readonly currentPage$ = this.pageParamsService.animeParams$.pipe(
		map(params => params.pageIndex),
	);

	/** Maximum number of items per page. */
	protected readonly pageSize$ = this.pageParamsService.animeParams$.pipe(
		map(params => params.pageSize),
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
		this.animeList$ = this.animeService.getAnimeList();
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
	protected onSearch(): void {
		this.pageParamsService.changeSearchParams(this.searchControl.value ?? AnimeQuery.DEFAULT_VALUES.searchValue);
	}

	/**
	 * Handles filter changes.
	 *
	 * @param selectValue Select element value.
	 */
	protected onFilter(selectValue: MatSelectChange): void {
		this.pageParamsService.changeFilterParams(selectValue);
	}

	private initializeParamsFromUrl(): void {
		const { pageSize, pageIndex, searchValue, sortOrder } = this.route.snapshot.queryParams;

		/** Gets array of filterByType. */
		const filterByType = this.route.snapshot.queryParamMap.getAll('filterByType');

		const selectedTypes = AnimeParamsMapper.toAnimeType(filterByType);

		this.selectControl.setValue(selectedTypes);
		this.searchControl.setValue(searchValue);

		this.pageParamsService.changeAnimeParams({
			pageSize,
			pageIndex,
			searchValue,
			sortOrder,
			filterByType: selectedTypes,
		});
	}
}
