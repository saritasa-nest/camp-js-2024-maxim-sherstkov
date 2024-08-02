import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { EmptyPipe } from '@js-camp/angular/shared/pipes/empty.pipe';
import { Anime, AnimeEnum } from '@js-camp/core/models/anime';
import { MatSortModule, Sort } from '@angular/material/sort';
import { BasicProgressSpinnerComponent } from '@js-camp/angular/shared/components/basic-progress-spinner/basic-progress-spinner.component';
import { PageParamsService } from '@js-camp/angular/core/services/page-params.service';

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

	private readonly pageParamsService = inject(PageParamsService);

	/** Anime enum. */
	protected readonly animeEnum = AnimeEnum;

	/** Columns names. */
	protected readonly displayedColumns = Object.values(AnimeEnum);

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
	 * Handles the sort change.
	 *
	 * @param sort New sort value.
	 */
	protected handleSortChange(sort: Sort): void {
		this.pageParamsService.changeSortParams(sort);
	}
}
