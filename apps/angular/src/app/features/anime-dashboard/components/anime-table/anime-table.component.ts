import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { EmptyPipe } from '@js-camp/angular/shared/pipes/empty.pipe';

/** Table of anime list component. */
@Component({
	selector: 'camp-anime-table',
	standalone: true,
	imports: [CommonModule, MatTableModule, EmptyPipe],
	templateUrl: './anime-table.component.html',
	styleUrl: './anime-table.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeTableComponent {
	private readonly animeService: AnimeService = inject(AnimeService);

	/** List of anime from the API. */
	protected readonly animeList$ = this.animeService.getAnimeList();

	/** Columns names. */
	// TODO make displayedColumns typesafed
	protected readonly displayedColumns = ['image', 'titleEnglish', 'titleJapanese', 'airedStart', 'type', 'status'] as const;
}
