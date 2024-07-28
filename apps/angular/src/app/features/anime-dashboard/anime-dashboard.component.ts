import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, switchMap, tap } from 'rxjs';
import { Anime } from '@js-camp/core/models/anime';

import { BasicProgressSpinnerComponent } from '@js-camp/angular/shared/components/basic-progress-spinner/basic-progress-spinner.component';

import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AnimeParams } from '@js-camp/core/models/based-params';

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
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeDashboardComponent implements OnInit {
	private readonly animeService: AnimeService = inject(AnimeService);

	protected route: ActivatedRoute = inject(ActivatedRoute);

	/** Anime list. */
	protected animeList$: Observable<readonly Anime[]> | null = null;

	
	/** Current page index. */
	protected currentPage$ = this.animeService.observableAnimeParams$.pipe(
		switchMap(async (params) => params.pageIndex)
	)
	
	/** Maximum number of items per page. */
	protected pageSize$ = this.animeService.observableAnimeParams$.pipe(
		switchMap(async (params) => params.pageSize)
	)

	/** Anime count. */
	protected animeTotal = AnimeParams.defaultValues.animeTotal;

	/** Search input value. */
	protected searchValue = AnimeParams.defaultValues.searchValue;

	

	/** @inheritdoc */
	public ngOnInit(): void {
		this.animeList$ = this.animeService.getAnimeList().pipe(
			tap(paginatedAnimeList => {
				this.animeTotal = paginatedAnimeList.count;
			}),

			map(animeList => animeList.results),
		);
	}

	public constructor() {
		const params = this.route.snapshot.queryParams;
		console.log(params);

		const pageSize = params['pageSize'] ? +params['pageSize'] : AnimeParams.defaultValues.pageSize;
		const pageIndex = params['pageIndex'] ? +params['pageIndex'] : AnimeParams.defaultValues.pageIndex;
		const searchValue = params['searchValue'] ? params['searchValue'] : AnimeParams.defaultValues.searchValue;
		const sortOrder = params['sortOrder'] ? params['sortOrder'] : AnimeParams.defaultValues.sortOrder;

		this.searchValue = searchValue

		/* Update pagination parameters in the service */
		this.animeService.changeAnimeParams(new AnimeParams({ pageSize, pageIndex, searchValue, sortOrder }))

		// TODO make function to init
	}

	/**
	 * Handles paginator changes.
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
		this.animeService.changeSearchParams(this.searchValue);
	}
}
