import { HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Params, Router } from '@angular/router';
import { AnimeParamsMapper } from '@js-camp/core/mappers/based-params.mapper';
import { AnimeParams } from '@js-camp/core/models/based-params';

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
	public changeQueryParams(params: Params): void {
		this.router.navigate([], {
			queryParams: params,
			queryParamsHandling: 'merge',
		});
	}

	/**
	 * Get an instance of HTTPParams from params.
	 * @param params Page parameters.
	 *  */
	public getHttpParams(params: AnimeParams): HttpParams {
		// TODO FIX type for params(mb make service only for a default params)

		const animeParams = { ...AnimeParamsMapper.toDto(params) };
		return new HttpParams({ fromObject: animeParams });
	}
}
