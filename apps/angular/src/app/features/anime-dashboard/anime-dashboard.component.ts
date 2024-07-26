import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { Anime } from '@js-camp/core/models/anime';

import { BasicProgressSpinnerComponent } from '@js-camp/angular/shared/components/basic-progress-spinner/basic-progress-spinner.component';

import { AnimeTableComponent } from './components/anime-table/anime-table.component';

const DEFAULT_PARAMS = {
	limit: 15,
	page: 0,
	animeTotal: 0,
};

/** Anime list dashboard component. */
@Component({
	selector: 'camp-anime-dashboard',
	templateUrl: './anime-dashboard.component.html',
	styleUrls: ['./anime-dashboard.component.css'],
	standalone: true,
	imports: [CommonModule, AnimeTableComponent, MatPaginator, BasicProgressSpinnerComponent],
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

	// protected pageSize = this.animeService.paginationParams;

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

		this.animeService.observablePaginationParams$.subscribe(val => {
			this.pageSize = val.limit;
			this.currentPage = val.page;
		});

	}

	public constructor() {
		const params = this.route.snapshot.queryParams;

		const limit = params['limit'] ? +params['limit'] : DEFAULT_PARAMS.limit;
		const page = params['page'] ? +params['page'] : DEFAULT_PARAMS.page;

		this.pageSize = limit;
		this.currentPage = page;

		/* Update pagination parameters in the service */
		this.animeService.changePaginationParams({ limit, page });

		// TODO make function to init
	}

	/**
	 * Handles paginator changes.
	 * @param pageEvent Event triggered by a paginator.
	 * */
	protected handlePageEvent(pageEvent: PageEvent): void {
		this.animeService.changePaginationParams({
			limit: pageEvent.pageSize,
			page: pageEvent.pageIndex,
		});

	}
}
