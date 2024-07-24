import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
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
	/** Anime list. */
	@Input() public animeList: Anime[] | null = [];

	/** Columns names. */
	protected readonly displayedColumns = ['image', 'englishTitle', 'japaneseTitle', 'airedStart', 'type', 'status'] as const;

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
