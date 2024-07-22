import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { EmptyPipe } from '@js-camp/angular/shared/pipes/empty.pipe';
import { BasicProgressSpinnerComponent } from '@js-camp/angular/shared/components/basic-progress-spinner/basic-progress-spinner.component';
import { Anime } from '@js-camp/core/models/anime';

/** Table of anime list component. */
@Component({
	selector: 'camp-anime-table',
	standalone: true,
	templateUrl: './anime-table.component.html',
	styleUrl: './anime-table.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [CommonModule, MatTableModule, EmptyPipe, BasicProgressSpinnerComponent],
})
export class AnimeTableComponent {
	private readonly animeService: AnimeService = inject(AnimeService);

	/** List of anime from the API. */
	protected readonly animeList$ = this.animeService.getAnimeList();

	/** Columns names. */
	protected readonly displayedColumns = ['image', 'titleEnglish', 'titleJapanese', 'airedStart', 'type', 'status'] as const;

	/**
	 * TrackBy function using Id of anime.
	 *
	 * @param _index The index of the current item.
	 * @param item The current item of the iteration.
	 * @returns Unique ID for item.
	 */
	public trackByAnimeId(_index: number, item: Anime): Anime['id'] {
		return item.id;
	}
}
