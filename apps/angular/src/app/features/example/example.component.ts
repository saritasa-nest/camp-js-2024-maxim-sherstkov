import { CommonModule } from '@angular/common';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { AppConfig } from '@js-camp/angular/core/services/app-config';

/** Example component. */
@Component({
	selector: 'camp-example',
	templateUrl: './example.component.html',
	styleUrls: ['./example.component.css'],
	standalone: true,
	imports: [CommonModule],
})
export class ExampleComponent implements OnInit {
	/** Comment. */
	protected readonly animeList$ = this.service.getAnimeList();

	public constructor(private service: AnimeService) {}

	/** Comment. */
	public ngOnInit(): void {

	}
}
