import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AnimeParamsMapper } from '@js-camp/core/mappers/anime-params.mapper';
import { AnimeQuery } from '@js-camp/core/models/anime-query';

/** Service to manage query params. */
@Injectable({
	providedIn: 'root',
})
export class QueryParamsService {
	/** Router object. */
	protected readonly router: Router = inject(Router);

	/**
	 * Merge query parameters with existing.
	 * @param params Page parameters.
	 */
	public changeQueryParams(params: AnimeQuery): void {
		const newParams = AnimeParamsMapper.toQueryParams(params);
		this.router.navigate([], {
			queryParams: newParams,
			queryParamsHandling: 'merge',
		});
	}
}
