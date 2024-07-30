import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, first, map, Observable, tap } from 'rxjs';
import { Anime } from '@js-camp/core/models/anime';
import { BasicProgressSpinnerComponent } from '@js-camp/angular/shared/components/basic-progress-spinner/basic-progress-spinner.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AnimeParams } from '@js-camp/core/models/based-params';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { AnimeType } from '@js-camp/core/models/anime-type';
import { MatButtonModule } from '@angular/material/button';

import { AnimeParamsMapper } from '@js-camp/core/mappers/based-params.mapper';

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
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeDashboardComponent implements OnInit {
	private readonly animeService: AnimeService = inject(AnimeService);

	/** Current route. */
	protected route: ActivatedRoute = inject(ActivatedRoute);

	/** Anime list. */
	protected animeList$: Observable<readonly Anime[]> | null = null;

	/** Current page index. */
	protected currentPage$ = this.animeService.observableAnimeParams$.pipe(
		map(params => params.pageIndex),
	);

	/** Maximum number of items per page. */
	protected pageSize$ = this.animeService.observableAnimeParams$.pipe(
		map(params => params.pageSize),
	);

	/** Loading state from the service. */
	protected readonly isLoading$ = this.animeService.observableIsLoading$;

	/** Anime count. */
	protected readonly animeTotal$ = new BehaviorSubject(AnimeParams.defaultValues.animeTotal);

	/** Search input value. */
	protected readonly searchValue$ = new BehaviorSubject(AnimeParams.defaultValues.searchValue);

	/** Anime type values. */
	protected readonly animeTypes = Object.values(AnimeType);

	/** Selected anime types for filtering. */
	protected selectedTypes: AnimeType[] = AnimeParams.defaultValues.filterByType;

	/** @inheritdoc */
	public ngOnInit(): void {
		this.loadAnimeList();
		this.initializeParamsFromUrl();
	}

	/**
	 * Handles paginator changes.
	 *
	 * @param pageEvent Event triggered by a paginator.
	 * */
	protected handlePageEvent(pageEvent: PageEvent): void {
		this.animeService.changePaginationParams(new AnimeParams({
			pageSize: pageEvent.pageSize,
			pageIndex: pageEvent.pageIndex,
		}));

	}

	/** Handles search form submit. */
	protected onSearch(): void {
		this.searchValue$.pipe(
			first(),
		).subscribe(searchValue => {
			this.animeService.changeSearchParams(searchValue);
		});
	}

	/**
	 * Handles filter changes.
	 *
	 * @param selectValue - Select element value.
	 */
	protected onFilter(selectValue: MatSelectChange): void {
		this.animeService.changeFilterParams(selectValue);
	}

	private initializeParamsFromUrl(): void {
		const { pageSize, pageIndex, searchValue, sortOrder } = this.route.snapshot.queryParams;
		const { defaultValues } = AnimeParams;

		/** Gets array of filterByType. */
		const filterByType = this.route.snapshot.queryParamMap.getAll('filterByType');

		this.searchValue$.pipe(
			first(),
		).subscribe(value => {
			this.searchValue$.next(value);
		});

		// this.searchValue = searchValue || defaultValues.searchValue;
		this.selectedTypes = AnimeParamsMapper.toArrayAnimeType(filterByType);

		this.animeService.changeAnimeParams({
			pageSize,
			pageIndex,
			searchValue,
			sortOrder,
			filterByType: this.selectedTypes,
		});
	}

	/** Load the anime list and update the total count. */
	private loadAnimeList(): void {
		this.animeList$ = this.animeService.getAnimeList().pipe(
			tap(paginatedAnimeList => {
				this.animeTotal$.next(paginatedAnimeList.count);
			}),
			map(animeList => animeList.results),
		);
	}
}
