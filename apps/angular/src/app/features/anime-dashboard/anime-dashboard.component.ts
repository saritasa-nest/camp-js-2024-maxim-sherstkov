import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';

import { AnimeService } from '@js-camp/angular/core/services/anime.service';

import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { ApiUrlService } from '@js-camp/angular/core/services/api-url.service';

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
export class AnimeDashboardComponent {
	private readonly animeService: AnimeService = inject(AnimeService);

	private readonly apiUrlService: ApiUrlService = inject(ApiUrlService);

	/** Anime list. */
	protected readonly animeList$ = this.animeService.getAnimeList();

	/** Current page index. */
	protected currentPage = 0;

	protected handlePageEvent(pageEvent: PageEvent) {
		console.log('hndlpageevent', pageEvent);

	}
}
