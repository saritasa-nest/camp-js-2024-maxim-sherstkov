import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';

import { AnimeService } from '@js-camp/angular/core/services/anime.service';

import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { ApiUrlService } from '@js-camp/angular/core/services/api-url.service';

import { ActivatedRoute, Params, Router } from '@angular/router';

import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Anime } from '@js-camp/core/models/anime';

import { HttpParams } from '@angular/common/http';

import { AnimeTableComponent } from './components/anime-table/anime-table.component';

const DEFAULT_PARAMS = {
	limit: 15,
	offset: 0,
	animeTotal: 0,
};

/** Anime list dashboard component. */
@Component({
	selector: 'camp-anime-dashboard',
	templateUrl: './anime-dashboard.component.html',
	styleUrls: ['./anime-dashboard.component.css'],
	standalone: true,
	imports: [CommonModule, AnimeTableComponent, MatPaginator],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeDashboardComponent implements OnInit {
	private readonly animeService: AnimeService = inject(AnimeService);

	/** Anime list. */
	protected animeList$: Observable<readonly Anime[]> | null = null;

	/** Anime count. */
	protected animeTotal = DEFAULT_PARAMS.animeTotal;

	/** Current page index. */
	protected currentPage = DEFAULT_PARAMS.offset;

	/** Maximum number of items per page. */
	protected pageSize = DEFAULT_PARAMS.limit;

	/** Current route. */
	protected readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);

	/** Router object. */
	protected readonly router: Router = inject(Router);

	/** @inheritdoc */
	public ngOnInit(): void {
		this.activatedRoute.queryParams.subscribe(queryParams => {
			const params = this.getParams(queryParams);
			console.log('new params arivved');

			this.animeList$ = this.animeService.getAnimeList(params).pipe(
				tap(paginatedAnimeList => {
					this.animeTotal = paginatedAnimeList.count;

					// return this.animeTotal$.next(paginatedAnimeList.count);
				}),

				// tap(val => console.log(val)),
				map(animeList => animeList.results),
			);

			// current params into page vars
			// this.currentpage = queryparams.page

		});
	}

	protected handlePageEvent(pageEvent: PageEvent) {
		console.log('hndlpageevent', pageEvent);
		this.router.navigate([], {
			relativeTo: this.activatedRoute,
			queryParams: { page: pageEvent.pageIndex },
			queryParamsHandling: 'merge',
		});

	}

	private getParams(queryParams: Params): HttpParams {
		// TODO fix complex logic
		const params = DEFAULT_PARAMS;
		params.limit = queryParams['limit'] ? parseInt(queryParams['limit'], 10) : DEFAULT_PARAMS.limit;
		params.offset = queryParams['page'] ? parseInt(queryParams['page'], 10) * params.limit : DEFAULT_PARAMS.offset * params.limit;
		this.currentPage = queryParams['page'];

		return new HttpParams({
			fromObject: params,
		});
	}
}
