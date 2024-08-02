import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { EmptyPipe } from '@js-camp/angular/shared/pipes/empty.pipe';
import { Anime, AnimeEnum } from '@js-camp/core/models/anime';
import { MatSortModule, Sort } from '@angular/material/sort';
import { BasicProgressSpinnerComponent } from '@js-camp/angular/shared/components/basic-progress-spinner/basic-progress-spinner.component';
import { PageParamsService } from '@js-camp/angular/core/services/page-params.service';
import { SortOrder } from '@js-camp/core/models/sort-order';
import { BehaviorSubject, take } from 'rxjs';

/** Table of anime list component. */
@Component({
	selector: 'camp-anime-table',
	standalone: true,
	templateUrl: './anime-table.component.html',
	styleUrl: './anime-table.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [CommonModule, MatTableModule, EmptyPipe, MatSortModule, BasicProgressSpinnerComponent],
})
export class AnimeTableComponent implements OnInit {
	/** Anime list. */
	@Input()
	public animeList: readonly Anime[] = [];

	private readonly pageParamsService = inject(PageParamsService);

	/** Anime enum. */
	protected readonly animeEnum = AnimeEnum;

	/** Anime page params. */
	protected readonly animeParams$ = this.pageParamsService.animeParams$;

	/** Columns names. */
	protected readonly displayedColumns = Object.values(AnimeEnum);

	/** Sorting order subject. */
	protected readonly sortOrder$ = new BehaviorSubject({ active: '', direction: '' } as SortOrder);

	/** @inheritdoc */
	public ngOnInit(): void {
		this.animeParams$.pipe(
			take(1),
		).subscribe(pageParams => {
			this.sortOrder$.next(this.parseSortOrder(pageParams.sortOrder));
		});
	}

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

	private parseSortOrder(sortOrder: string): SortOrder {
		const direction = sortOrder.startsWith('-') ? 'desc' : 'asc';

		const activeField = sortOrder.startsWith('-') ? sortOrder.slice(1) : sortOrder;

		return {
			active: activeField,
			direction,
		};
	}
}
