import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';

import { AnimeService } from '@js-camp/angular/core/services/anime.service';

import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { ApiUrlService } from '@js-camp/angular/core/services/api-url.service';

import { ActivatedRoute, Params } from '@angular/router';

import { Observable } from 'rxjs';
import { Anime } from '@js-camp/core/models/anime';

import { HttpParams } from '@angular/common/http';

import { AnimeTableComponent } from './components/anime-table/anime-table.component';

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

	private readonly apiUrlService: ApiUrlService = inject(ApiUrlService);

	/** Anime list. */
	protected animeList$: Observable<Anime[]> | null = null;

	// protected readonly animeList$ = this.animeService.getAnimeList();

	/** Current page index. */
	protected currentPage = 0;

	/** Current route. */
	protected readonly route: ActivatedRoute = inject(ActivatedRoute);

	/** @inheritdoc */
	public ngOnInit(): void {
		this.route.queryParams.subscribe(queryParams => {
			const params = this.getParams(queryParams);

			this.animeList$ = this.animeService.getAnimeList(params);

			// current params into page vars
			// this.currentpage = queryparams.page

		});
	}

	protected handlePageEvent(pageEvent: PageEvent) {
		console.log('hndlpageevent', pageEvent);

	}

	private getParams(queryParams: Params): HttpParams {
		const DEFAULT_PARAMS = {
			offset: 0,
			limit: 5,
		};

		// TODO fix complex logic
		const params = DEFAULT_PARAMS;
		params.limit = queryParams['limit'] ? parseInt(queryParams['limit'], 10) : DEFAULT_PARAMS.limit;
		params.offset = queryParams['page'] ? parseInt(queryParams['page'], 10) * params.limit : DEFAULT_PARAMS.offset * params.limit;

		return new HttpParams({
			fromObject: params,
		});
	}
}
