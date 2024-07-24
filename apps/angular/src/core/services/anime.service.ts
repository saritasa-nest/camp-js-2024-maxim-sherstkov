import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Anime } from '@js-camp/core/models/anime';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { map, Observable } from 'rxjs';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';

import { ApiUrlService } from './api-url.service';

/**
 * Anime service to interact with the API.
 */
@Injectable({
	providedIn: 'root',
})
export class AnimeService {
	private readonly http = inject(HttpClient);

	private readonly urlService = inject(ApiUrlService);

	/**
	 * Get a list of anime from the API.
	 */
	public getAnimeList(): Observable<Anime[]> {
		return this.http.get<PaginationDto<AnimeDto>>(this.urlService.animeListPath).pipe(
			map(animeDto => animeDto.results.map(anime => AnimeMapper.fromDto(anime))),
		);
	}
}
