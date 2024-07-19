import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { EmptyPipe } from '@js-camp/angular/shared/pipes/empty.pipe';

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
	private readonly animeService: AnimeService = inject(AnimeService);

	/** List of anime from the API. */
	protected readonly animeList$ = this.animeService.getAnimeList();

	/** Columns names. */
	// TODO make displayedColumns typesafed
	protected readonly displayedColumns = ['image', 'titleEnglish', 'titleJapanese', 'airedStart', 'type', 'status'] as const;

	// public readonly foo = Object.fromEntries(this.displayedColumns.map(col => [col, col]));

	// public readonly columnKeys = ['image', 'title']
	// constructor() {
	// 	// console.log(this.foo);

	// 	type Column = typeof this.columnKeys[number]
	// }

	/** Table columns. */
	// public initColumns: Array<{name: string; display: string;}> = [
	// 	{
	// 		name: 'image',
	// 		display: 'Image',
	// 	},
	// 	{
	// 		name: 'titleEnglish',
	// 		display: 'English title',
	// 	},
	// 	{
	// 		name: 'titleJapanese',
	// 		display: 'Japanese title',
	// 	},
	// 	{
	// 		name: 'airedStart',
	// 		display: 'Aired start',
	// 	},
	// 	{
	// 		name: 'type',
	// 		display: 'Type',
	// 	},
	// 	{
	// 		name: 'status',
	// 		display: 'Status',
	// 	},
	// ];

	// public readonly displayedColumns: any[] = this.initColumns.map(col => col.name);
}
