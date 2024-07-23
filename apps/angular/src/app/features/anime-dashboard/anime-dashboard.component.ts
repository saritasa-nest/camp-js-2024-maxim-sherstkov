import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';

import { AnimeService } from '@js-camp/angular/core/services/anime.service';

import { AnimeTableComponent } from './components/anime-table/anime-table.component';

/** Anime list dashboard component. */
@Component({
	selector: 'camp-anime-dashboard',
	templateUrl: './anime-dashboard.component.html',
	styleUrls: ['./anime-dashboard.component.css'],
	standalone: true,
	imports: [CommonModule, AnimeTableComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeDashboardComponent {
	private readonly animeService: AnimeService = inject(AnimeService);

	/** Anime list. */
	protected readonly animeList$ = this.animeService.getAnimeList();
}
