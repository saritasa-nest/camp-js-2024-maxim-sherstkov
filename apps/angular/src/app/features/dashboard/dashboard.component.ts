import { CommonModule } from '@angular/common';
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

/** Example component. */
@Component({
	selector: 'anime-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css'],
	standalone: true,
	imports: [CommonModule, MatSlideToggleModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
	private readonly animeService: AnimeService = inject(AnimeService);

	/** List of anime from the API. */
	protected readonly animeList$ = this.animeService.getAnimeList();

	public constructor() {}
}
