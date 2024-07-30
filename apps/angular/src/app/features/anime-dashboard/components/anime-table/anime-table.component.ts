import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { EmptyPipe } from '@js-camp/angular/shared/pipes/empty.pipe';
import { Anime } from '@js-camp/core/models/anime';
import { MatSortModule, Sort } from '@angular/material/sort';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { BasicProgressSpinnerComponent } from '@js-camp/angular/shared/components/basic-progress-spinner/basic-progress-spinner.component';

/** Table of anime list component. */
@Component({
	selector: 'camp-anime-table',
	standalone: true,
	templateUrl: './anime-table.component.html',
	styleUrl: './anime-table.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [CommonModule, MatTableModule, EmptyPipe, MatSortModule, BasicProgressSpinnerComponent],
})
export class AnimeTableComponent {

	/** Anime list. */
	@Input() public animeList: readonly Anime[] | null = [];

	private readonly animeService: AnimeService = inject(AnimeService);

	/** Columns names. */
	protected readonly displayedColumns = ['image', 'englishTitle', 'japaneseTitle', 'airedStart', 'type', 'status'] as const;

	/**
	 * TrackBy function using Id of anime.
	 *
	 * @param _index The index of the current item.
	 * @param item The current item of the iteration.
	 */
	protected trackByAnimeId(_index: number, item: Anime): Anime['id'] {
		return item.id;
	}

	/**
	 * Handles the change in sorting.
	 *
	 * @param event - The event object containing the sorting information.
	 */
	protected handleSortChange(event: Sort): void {
		this.animeService.changeSortParams(event);
	}
}
