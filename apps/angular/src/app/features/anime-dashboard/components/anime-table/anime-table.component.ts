import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { Observable } from 'rxjs';
import { Anime } from '@js-camp/core/models/anime';

/** Table of anime list component. */
@Component({
	selector: 'camp-anime-table',
	standalone: true,
	imports: [CommonModule, MatTableModule],
	templateUrl: './anime-table.component.html',
	styleUrl: './anime-table.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeTableComponent {
	private readonly animeService: AnimeService = inject(AnimeService);

	/** List of anime from the API. */
	protected readonly animeList$: Observable<readonly Anime[]>;

	public constructor() {
		this.animeList$ = this.animeService.getAnimeList();
	}

	/** Columns names. */
	protected readonly displayedColumns = ['image', 'titleEnglish', 'titleJapanese', 'airedStart', 'type', 'status'] as const;
}
