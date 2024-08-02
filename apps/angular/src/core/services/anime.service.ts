import { DestroyRef, inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Anime } from '@js-camp/core/models/anime';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { map, Observable, switchMap } from 'rxjs';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { Pagination } from '@js-camp/core/models/pagination';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AnimeParamsMapper } from '@js-camp/core/mappers/anime-params.mapper';

import { ApiUrlService } from './api-url.service';
import { PageParamsService } from './page-params.service';

/**
 * Anime service to interact with the API.
 */
@Injectable({
	providedIn: 'root',
})
export class AnimeService {
	private readonly http = inject(HttpClient);

	private readonly apiUrlService = inject(ApiUrlService);

	private readonly pageParamsService = inject(PageParamsService);

	private readonly destroyRef = inject(DestroyRef);

	private readonly animeParams$ = this.pageParamsService.animeParams$;

	/** Get a list of anime from the API. */
	public getAnimeList(): Observable<Pagination<Anime>> {
		return this.animeParams$.pipe(
			takeUntilDestroyed(this.destroyRef),
			switchMap(params => {
				// this._isLoading$.next(true);
				const httpParams = AnimeParamsMapper.toAnimeHttp(params);

				return this.http.get<PaginationDto<AnimeDto>>(this.apiUrlService.animeListPath, { params: httpParams }).pipe(
					map(pagination => PaginationMapper.fromDto(
						pagination,
						animeDto => AnimeMapper.fromDto(animeDto),
					)),

					// tap(() => this._isLoading$.next(false)),
				);
			}),
		);
	}

}
