import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { EmptyPipe } from '@js-camp/angular/shared/pipes/empty.pipe';
import { Anime } from '@js-camp/core/models/anime';

/** Table of anime list component. */
@Component({
	selector: 'camp-anime-table',
	standalone: true,
	templateUrl: './anime-table.component.html',
	styleUrl: './anime-table.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [CommonModule, MatTableModule, EmptyPipe],
})
export class AnimeTableComponent {
	/** Anime list. */
	@Input() public animeList: readonly Anime[] | null = [];

	/** Columns names. */
	protected readonly displayedColumns = ['image', 'titleEnglish', 'titleJapanese', 'airedStart', 'type', 'status'] as const;

	/**
	 * TrackBy function using Id of anime.
	 *
	 * @param _index The index of the current item.
	 * @param item The current item of the iteration.
	 * @returns Unique ID for item.
	 */
	protected trackByAnimeId(_index: number, item: Anime): Anime['id'] {
		return item.id;
	}
}
