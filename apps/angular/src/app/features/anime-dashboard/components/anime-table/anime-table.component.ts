import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { EmptyPipe } from '@js-camp/angular/shared/pipes/empty.pipe';
import { Anime, AnimeFieldEnum } from '@js-camp/core/models/anime';
import { MatSortModule, Sort } from '@angular/material/sort';
import { BasicProgressSpinnerComponent } from '@js-camp/angular/shared/components/basic-progress-spinner/basic-progress-spinner.component';
import { SortParameters } from '@js-camp/core/models/sort-order';
import { BehaviorSubject } from 'rxjs';

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
	@Input()
	public animeList: readonly Anime[] = [];

	/** Initial sort params. */
	@Input()
	public sortParams: Sort = { active: '', direction: '' };

	/** Emits new sort value. */
	@Output()
	public sortChange = new EventEmitter<Sort>();

	/** Anime column enum. */
	protected readonly animeColumnNames = AnimeFieldEnum;

	/** Columns names. */
	protected readonly displayedColumns = Object.values(AnimeFieldEnum);

	/** Sorting order subject. */
	protected readonly sortOrder$ = new BehaviorSubject({ active: '', direction: '' } as SortParameters);

	/**
	 * TrackBy function using Id of anime.
	 *
	 * @param _index The index of the current item.
	 * @param item The current item of the iteration.
	 */
	protected trackByAnimeId(_index: number, item: Anime): Anime['id'] {
		return item.id;
	}
}
