import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, map, Observable, tap } from 'rxjs';
import { Anime } from '@js-camp/core/models/anime';

import { BasicProgressSpinnerComponent } from '@js-camp/angular/shared/components/basic-progress-spinner/basic-progress-spinner.component';

import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AnimeParams } from '@js-camp/core/models/based-params';

import { AnimeTableComponent } from './components/anime-table/anime-table.component';

const DEFAULT_PARAMS = {
	limit: 15,
	page: 0,
	animeTotal: 0,
	searchValue: '',
};

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

	/** Anime list. */
	protected animeList$: Observable<readonly Anime[]> | null = null;

	/** Anime count. */
	protected animeTotal = DEFAULT_PARAMS.animeTotal;

	/** Current page index. */
	protected currentPage = DEFAULT_PARAMS.page;

	/** Maximum number of items per page. */
	protected pageSize = DEFAULT_PARAMS.limit;

	/** Search input value. */
	protected searchValue = DEFAULT_PARAMS.searchValue;

	/** Current route. */
	protected route: ActivatedRoute = inject(ActivatedRoute);

	/** @inheritdoc */
	public ngOnInit(): void {
		this.animeList$ = this.animeService.getAnimeList().pipe(
			tap(paginatedAnimeList => {
				this.animeTotal = paginatedAnimeList.count;
			}),

			map(animeList => animeList.results),
		);

		// TODO may refactor?
		// combineLatest([this.animeService.observablePaginationPage$, this.animeService.observablePaginationLimit$])
		// 	.subscribe(([page, limit]) => {
		// 		this.currentPage = page;
		// 		this.pageSize = limit;
		// 	});

	}

	public constructor() {
		const params = this.route.snapshot.queryParams;
		console.log(params);

		const pageSize = params['pageSize'] ? +params['pageSize'] : DEFAULT_PARAMS.limit;
		const pageIndex = params['pageIndex'] ? +params['pageIndex'] : DEFAULT_PARAMS.page;
		const searchValue = params['searchValue'] ? params['searchValue'] : DEFAULT_PARAMS.searchValue;

		this.pageSize = pageSize;
		this.currentPage = pageIndex;
		this.searchValue = searchValue;

		/* Update pagination parameters in the service */
		this.animeService.changePaginationParams(new AnimeParams({ pageSize, pageIndex }));
		this.animeService.changeSearchParam(searchValue);

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

	/**
	 * Handles search input changes.
	 *
	 * @protected
	 */
	protected handleSearchInput(): void {
		this.animeService.changeSearchParam(this.searchValue);
	}
}
