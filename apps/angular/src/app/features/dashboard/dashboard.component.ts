import { CommonModule } from '@angular/common';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { AppConfig } from '@js-camp/angular/core/services/app-config';

/** Example component. */
@Component({
	selector: 'dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css'],
	standalone: true,
	imports: [CommonModule],
})
export class DashboardComponent implements OnInit {
	private readonly animeService: AnimeService = inject(AnimeService);

	/** List of anime from the API. */
	protected readonly animeList$ = this.animeService.getAnimeList();

	public constructor() {}

	/** @inheritdoc */
	public ngOnInit(): void {

	}
}
